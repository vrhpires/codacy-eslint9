// src/DocGenerator.ts

import { EOL } from "node:os"
import path from "node:path"

import { type RuleInfo, rules as rulesStylistic } from "@eslint-stylistic/metadata"
import axios from "axios"
import {
  DescriptionEntry,
  DescriptionParameter,
  ParameterSpec,
  PatternSpec,
  Specification,
  writeFile
} from "codacy-seed"
import type { Rule } from "eslint"
import fs from "fs-extra"
import type { JSONSchema4 } from "json-schema"

import { isBlacklistedOnlyFromDocumentation } from "lib/models/blacklist.ts"
import { capitalize, patternTitle } from "lib/utils/strings.ts"
import { getAllRules, pluginByPackageName, type Plugin, type PluginDocsInfo } from "lib/models/plugins.ts";
import { patternIdToCodacy, translateTypes } from "lib/models/patterns.ts";
import { fromSchemaArray } from "lib/utils/namedParameters.ts"
import { rulesToUnnamedParametersDefaults } from "lib/utils/rulesToUnnamedParametersDefaults.ts"
import { toolName, toolVersion } from "lib/utils/metadata.ts"
import { TerminalColor, wrapConsoleTextInColor } from "lib/utils/logging.ts"

export class DocGenerator {
  private docsDirectory = "./docs"
  private docsDescriptionDirectory = path.join(this.docsDirectory, "description")
  private githubBaseUrl = "https://raw.githubusercontent.com"
  private rules: Promise<[string, Rule.RuleModule][]>
  private dependencies: Promise<Record<string, string>>

  constructor () {
    this.rules = this.initializeRules()
    this.dependencies = this.initializeDependencies()
  }
 
  private async initializeRules (): Promise<[string, Rule.RuleModule][]> {
    const rules = (await getAllRules())
      .filter(([patternId, rule]) =>
        !isBlacklistedOnlyFromDocumentation(patternId)
        && !(rule?.meta?.deprecated && rule.meta.deprecated === true)
      )
    console.log("Number of rules: ", rules.length)
    return rules
  }

  private async initializeDependencies (): Promise<Record<string, string>> {
    const packageJsonRaw = await fs.readFile("../codacy/package.json", { encoding: "utf-8" });
    const packageJson = JSON.parse(packageJsonRaw) as { dependencies?: Record<string, string> };

    if (packageJson.dependencies === undefined) return {};

    let dependencies: Record<string, string> = {};

    for (const [packageName, versionString] of Object.entries(packageJson.dependencies)) {
      const version = versionString.replace("^", "");
      if (version !== null) {
        dependencies[packageName] = version;
      }
    }

    return dependencies;
  }

  private async getPatternIds (): Promise<string[]> {
    const rules = await this.rules
    return rules.map(([patternId ]) => patternId)
  }

  static generateParameters (
    patternId: string,
    schema: JSONSchema4 | JSONSchema4[] | undefined
  ): ParameterSpec[] {
    const unnamedParameterValue = rulesToUnnamedParametersDefaults.get(patternId)
    const unnamedParameter = unnamedParameterValue
      ? new ParameterSpec("unnamedParam", unnamedParameterValue)
      : undefined

    const namedParameters = schema
      ? DocGenerator.fromEslintSchemaToParameters(patternId, schema)
      : undefined

    if (namedParameters && unnamedParameter)
      return [unnamedParameter, ...namedParameters]
    if (namedParameters)
      return namedParameters
    if (unnamedParameter)
      return [unnamedParameter]

    return []
  }

  private async generatePatterns (): Promise<Specification> {
    const rules = await this.rules
    const patterns = rules.flatMap(([patternId, ruleModule]) => {
      const meta = ruleModule.meta
      const type = meta?.type ?? meta?.docs?.category
      const [level, category, securitySubcategory, scanType] = translateTypes(
        patternId,
        type
      )
  
      return new PatternSpec(
        patternIdToCodacy(patternId),
        level,
        category,
        securitySubcategory,
        scanType,
        DocGenerator.generateParameters(patternId, meta?.schema),
        DocGenerator.isDefaultPattern(patternId, meta)
      )
    })
  
    return new Specification(toolName, toolVersion, patterns)
  }

  static isDefaultPattern (patternId: string, meta: Rule.RuleMetaData | undefined): boolean {
    function prefixSplit (patternId: string): string {
      const p = patternId.split("/")[0]
      return p !== patternId ? p : ""
    }

    // The following arrays represents groups of default rules.
    // Each entry is an object where:
    //   - The key is the prefix identifying the plugin name (e.g. '@stylistic', '@typescript-eslint', 'security')
    //     ESLint core rules are represented by an empty prefix ("");
    //   - The value is either 'recommended' or 'all', which determines whether all rules or only the recommended rules in the group are included.
    type prefixSet = { [key: string]: "recommended" | "all" }
    const defaultPrefixes = [
      { "": "recommended" },
      { "@stylistic": "recommended" },
      { "@typescript-eslint": "recommended" },
      { "eslint-plugin": "recommended" }
    ] as prefixSet[]
    const securityPrefixes = [
      { "no-unsanitized": "all" },
      { "security": "recommended" },
      { "security-node": "recommended" },
      { "xss": "all" }
    ] as prefixSet[]

    const prefixes = [...defaultPrefixes, ...securityPrefixes]
    const prefix = prefixSplit(patternId)

    return prefixes.some((p) => 
      p[prefix] === "all"
      || p[prefix] === "recommended" && meta?.docs?.recommended
    )
  }

  private async generateDescriptionEntries (): Promise<DescriptionEntry[]> {
    const descriptions: DescriptionEntry[] = []
    const rules = await this.rules
    rules.forEach(([patternId, ruleModule]) => {
      const meta = ruleModule?.meta
      const description = meta?.docs?.description
        ? capitalize(meta.docs.description)
        : undefined
      const timeToFix = 5
      const descriptionParameters = DocGenerator
        .generateParameters(
          patternId,
          meta?.schema
        )
        .map((p) => new DescriptionParameter(p.name, p.name))
  
      descriptions.push(new DescriptionEntry(
        patternIdToCodacy(patternId),
        patternTitle(patternId),
        description,
        timeToFix,
        descriptionParameters
      ))
    })
  
    console.log("Number of descriptions: ", descriptions.length)
    return descriptions
  }

  static fromEslintSchemaToParameters (
    patternId: string,
    schema: JSONSchema4 | JSONSchema4[]
  ): ParameterSpec[] {
    const flattenSchema = (schema: JSONSchema4 | JSONSchema4[], result: JSONSchema4[] = []): JSONSchema4[] => {
      if (Array.isArray(schema)) {
        schema.forEach(item => flattenSchema(item, result));
      } else {
        if (schema.anyOf) {
          schema.anyOf.forEach(item => flattenSchema(item, result));
        } else {
          result.push(schema);
        }
      }
      return result;
    };
    const flattenedSchema = flattenSchema(schema);
    const objects = flattenedSchema.filter(value => value && value.properties);

    return Array.isArray(objects) ? fromSchemaArray(patternId, objects) : []
  }

  private convertMdxToMd (text: string): string {
    return text
      .replace(/import {?.*}? from ["'].*["'];?/g, "")
      .replace(/<(\/)?Tabs>/g, "<!--$1tabs-->\n")
      .replace(/<\/TabItem>/g, "")
      .replace(/<TabItem value="(.*)">/g, "#### $1")
      .replace(/{\/\* (.*) \*\/}/g, "<!-- $1 -->")
      .replace(/\n{2,}/g, "\n\n")
  }

  async createPatternDescriptionFile (
    plugin: Plugin,
    pattern: string,
    patternDocFilename: string,
    rejectOnError: boolean | undefined
  ): Promise<void> {
    try {
      const pluginVersion = (await this.dependencies)[plugin.packageName];
      const url = (
        (plugin.docs?.versionPrefix !== false && plugin.docs?.versionPrefix !== undefined)
        ? plugin.docs?.baseUrl?.href.replace(/main|master/, `${plugin.docs.versionPrefix}${pluginVersion}`)
        : plugin.docs?.baseUrl?.href
      ) + patternDocFilename;

      const response = (await axios.get(url)).data as string;
      const text: string = 
        plugin.docs?.baseUrl
        ? this.inlineLinkedMarkdownFiles(response, plugin.docs?.baseUrl.href)
        : response;
      const filePath = `${this.docsDescriptionDirectory}/${patternIdToCodacy((plugin.name !== "eslint" ? plugin.name + "/" : "") + pattern)}.md`;

      await writeFile(filePath, plugin.name === "@typescript-eslint" ? this.convertMdxToMd(text) : text);
    } catch (error) {
      const message = `Failed to retrieve docs for ${pattern}\n- ${error}`;
      
      if (rejectOnError) {
        return Promise.reject(message);
      }
      console.error(wrapConsoleTextInColor(message, TerminalColor.Red));
    }
  }

  async downloadAllPluginsDocs (downloadDocsInfo: DownloadDocsInfo[]): Promise<void> {
    downloadDocsInfo.forEach((pluginDocsInfo) => {
      try {
        this.downloadPluginDocs(pluginDocsInfo);
      }
      catch(error) {
        console.error(error)
      }
    });
  }

  async downloadPluginDocs (pluginDocs: DownloadDocsInfo): Promise<void> {
    const plugin: Plugin | undefined = await pluginByPackageName(pluginDocs.packageName)

    if (plugin === undefined) {
      console.error(wrapConsoleTextInColor(`Plugin ${pluginDocs.packageName} not found`, TerminalColor.Red))
      return
    }

    console.log(`Generate ${plugin.name} description files`)

    plugin.docs = {
      relativeUrl: pluginDocs.docs.relativeUrl,
      baseUrl: new URL((!pluginDocs.docs.relativeUrl.startsWith("https://") ? this.githubBaseUrl : "") + pluginDocs.docs.relativeUrl),
      versionPrefix: pluginDocs.docs.versionPrefix
    }

    const patterns = plugin.name !== "eslint"
      ? await this.patternIdsWithoutPrefix(plugin.name)
      : this.eslintPatternIds()

    const promises = plugin.name === "@stylistic"
      ? rulesStylistic
        .filter((rule: RuleInfo) => rule.ruleId.match(/^@stylistic\/[^/]+$/) !== null)
        .map((rule: RuleInfo) => {
          return this.createPatternDescriptionFile(plugin, rule.name, rule.docsEntry, pluginDocs.docs.rejectOnError)
        })
      : (await patterns).map((pattern: string) => {
        const patternDocFilename = 
          plugin.name === "@typescript-eslint"
          ? `${pattern}.mdx`
          : `${pattern}.md`
        return this.createPatternDescriptionFile(plugin, pattern, patternDocFilename, pluginDocs.docs.rejectOnError)
      })
    await Promise.all(promises)
  }

  async createDescriptionFile (): Promise<void> {
    console.log("Generate description.json")
    const descriptions = await this.generateDescriptionEntries()

    if (!descriptions.length) return
    
    await this.emptyDocsDescriptionFolder()
    await this.writeFileInJson(
      path.resolve(this.docsDescriptionDirectory, "description.json"),
      descriptions
    )
  }

  async createPatternsFile (): Promise<void> {
    console.log("Generate patterns.json")
    const patterns = await this.generatePatterns()

    if (!patterns.patterns.length) return

    await this.writeFileInJson(
      path.resolve(this.docsDirectory, "patterns.json"),
      patterns
    )
  }

  async createAllPatternsMultipleTestFiles (): Promise<void> {
    console.log("Generate patterns.xml")

    const patternIds = await this.getPatternIds()
    
    const modules = patternIds
      .map(patternId => `  <module name="${patternIdToCodacy(patternId)}" />`)
      .join("\n")

    const patternsJSFilename = path.resolve(this.docsDirectory, "multiple-tests", "all-patterns", "patterns.xml")
    const patternsTSFilename = path.resolve(this.docsDirectory, "multiple-tests", "all-patterns-typescript", "patterns.xml")
    const patternsXml = `<!-- This file is generated by generateDocs. Do not edit. -->
<module name="root">
  <module name="BeforeExecutionExclusionFileFilter">
    <property name="fileNamePattern" value=".*\\.json" />
  </module>
${modules}
</module>
`
    await Promise.all([
      writeFile(patternsJSFilename, patternsXml),
      writeFile(patternsTSFilename, patternsXml)
    ])
  }

  private async patternIdsWithoutPrefix (prefix: string): Promise<string[]> {
    const longPrefix = prefix + "/"

    const patternIds = await this.getPatternIds()
    return patternIds
      .filter((patternId) => patternId.startsWith(longPrefix))
      .map((patternId) => patternId.substring(longPrefix.length))
  }

  private async eslintPatternIds (): Promise<string[]> {
    // We take all the patterns except those that have slashes because
    // they come from third party plugins
    const patternIds = await this.getPatternIds()
    
    return patternIds.filter((e) => !e.includes("/"))
  }

  private convertFromGithubRawLink (url: string): string {
    const parsedUrl = new URL(url)
    parsedUrl.host = "github.com"

    const parts = parsedUrl.pathname.split("/")
    parts.splice(3, 0, "tree")
    parsedUrl.pathname = parts.join("/")
    
    return parsedUrl.toString()
  }

  private inlineLinkedMarkdownFiles (text: string, docsBaseUrl: string): string {
    const elements = text.match(/\[.+?\]\(\.{1,2}[^)]+?\.?[a-z]+\)/g)
    if (!elements) return text
  
    let newText = text

    elements.map(async (elem) => {
      const urlMatch = elem.match(/\((.+?\.?[a-z]+)\)/)
      if (!urlMatch) return
  
      const fullUrl = this.convertFromGithubRawLink(docsBaseUrl + urlMatch[1])
      newText = newText.replace(urlMatch[1], fullUrl)
    })

    return newText
  }

  private async emptyDocsDescriptionFolder (): Promise<void> {
    await fs.emptyDir(this.docsDescriptionDirectory)
  }

  private async writeFileInJson (file: string, json: Specification | DescriptionEntry[]): Promise<void> {
    await writeFile(file, JSON.stringify(json, null, 2) + EOL)
  }
};

export interface DownloadDocsInfo {
  packageName: Plugin["packageName"];
  docs: PluginDocsInfo
};

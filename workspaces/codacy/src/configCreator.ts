import { existsSync } from "node:fs";
import path from "node:path";

import { type Codacyrc, Parameter, ParameterSpec, Pattern } from "codacy-seed";
import type { Linter } from "eslint";
import { fromPairs, isEmpty, partition } from "lodash-es";
import type { TSESLint } from '@typescript-eslint/utils';

import { DocsGenerator } from "docs-generator/src/docsGenerator.ts";
import { baseConfig } from "codacy/src/defaultOptions.ts";
import { getAll, getAllRules, getRuleMeta } from "lib/models/plugins.ts";
import { DEBUG, debug } from "lib/utils/logging.ts";
import { patternIdToEslint/*, securityPlugins */} from "lib/models/patterns.ts";

export async function createEslintConfig(
  srcDirPath: string,
  codacyrc: Codacyrc
): Promise<[TSESLint.FlatESLint.ESLintOptions, string[]]> {

  const options = await generateEslintOptions(srcDirPath, codacyrc)
  const files = generateFilesToAnalyze(codacyrc)

  return [options, files]
}

function generateFilesToAnalyze(
  codacyrc: Codacyrc
): string[] {

  const defaultFilesToAnalyze = [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.json"
  ]
  const files = codacyrc?.files && codacyrc.files.length
    ? codacyrc.files
    : defaultFilesToAnalyze

  return files
}

async function generateEslintOptions(
  srcDirPath: string,
  codacyrc: Codacyrc
): Promise<TSESLint.FlatESLint.ESLintOptions> {
  console.log(JSON.stringify(codacyrc, null, 2))

  let patterns = codacyrc.tools?.[0].patterns || [];
  debug(`options: ${patterns.length} patterns in codacyrc`)
  console.log(`options: ${patterns.length} patterns in codacyrc`)

  const eslintConfig = existsEslintConfigInRepoRoot(srcDirPath);

  const useCodacyPatterns = patterns.length;
  const useRepoPatterns = !useCodacyPatterns;
  const options: TSESLint.FlatESLint.ESLintOptions = {
    errorOnUnmatchedPattern: false,
    ignorePatterns: [
      "**/node_modules/**",
      "dist/**",
      "bin/**",
      "build/**",
      "tests/**",
      "vendor/**",
      "**/tsconfig.json",
      "**/.eslintrc*",
      "**/eslint.config.*",
      "**/package.json",
      "**/package-lock.json"
    ],
    //passOnNoPatterns: true,
    warnIgnored: false,
    overrideConfig: []
  }

  if (eslintConfig && useRepoPatterns) {
    debug(`options: using config from repo root: ${eslintConfig}`)
    console.log(`options: using config from repo root: ${eslintConfig}`)
    options.overrideConfigFile = srcDirPath + path.sep + eslintConfig;
  }

  if (!DEBUG && useRepoPatterns) {
    debug("options: using config from repo root");
    return options;
  }

  options.baseConfig = baseConfig;

  if (DEBUG && useRepoPatterns && !eslintConfig) {
    const patternsSet = "recommended";
    debug(`config: retrieveCodacyPatterns`)
    patterns = await retrieveCodacyPatterns(patternsSet);
    options.overrideConfig?.push({
      rules: convertPatternsToEslintRules(patterns)
    });

  } else if (useCodacyPatterns) {
    //TODO: move this logic to a generic (or specific) plugin function

    // There are some plugins that their rules should only apply for
    // some specific file types / files names. So when those are enabled
    // explicitly we need to apply them with a bit of customization.
    //
    //   example: a rule for the storybook should only apply to files with
    //            "story" or "stories" in the name. If enabled for all files it
    //            reports false positives on normal files.
    //            check: conf file @ eslint-plugin-storybook/configs/recommended.js

    const [storybookPatterns, otherPatterns] = partition(
      patterns, (p: Pattern) =>
      p.patternId.startsWith("storybook") || false
    )

    // configure override in case storybook plugin rules being turned on
    if (storybookPatterns.length) {

      options.overrideConfig?.push({
        files: [
          "*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
          "*.story.@(ts|tsx|js|jsx|mjs|cjs)"
        ],
        rules: convertPatternsToEslintRules(storybookPatterns)
      });
    }

    // explicitly use only the rules being passed by codacyrc
    if (otherPatterns.length) {
      options.overrideConfig?.push({
        rules: convertPatternsToEslintRules(otherPatterns)
      });
    }
  }

  // load only the plugins that are being used in loaded rules
  const prefixes = getPatternsUniquePrefixes(patterns)

  const plugins: Record<string, TSESLint.Linter.Plugin> = {};
  (await getAll())
    .filter(plugin => prefixes.includes(plugin.name))
    .forEach(plugin => {
      //if (!securityPlugins.includes(plugin.name)) {
        if (!plugins[plugin.name]) {
          plugins[plugin.name] = plugin.module;
        }
      //}
    });
  if (Object.keys(plugins).length) {
    options.plugins = plugins;
  }

  return options;
}

function getPatternsUniquePrefixes(patterns: Pattern[]) {
  const prefixes = patterns.map(item => {
    const patternId = patternIdToEslint(item.patternId)
    return patternId.substring(0, patternId.lastIndexOf("/"))
  })
  return [...new Set(prefixes)]
}

function convertPatternsToEslintRules(patterns: Pattern[]): {
  [name: string]: Linter.RuleSeverity | Linter.RuleSeverityAndOptions;
} {
  const pairs = patterns.map((pattern: Pattern) => {
    const patternId = patternIdToEslint(pattern.patternId)
    if (!pattern.parameters) {
      return [patternId, "error"]
    }

    const [unnamedParameters, namedParameters] = partition(
      pattern.parameters,
      (p) => p.name === "unnamedParam"
    )
    const namedOptions = fromPairs(namedParameters.map((p) => [p.name, p.value]))
    const unnamedOptions = unnamedParameters.map((p) => p.value)

    return [
      patternId,
      isEmpty(namedOptions)
        ? ["error", ...unnamedOptions]
        : ["error", ...unnamedOptions, namedOptions]
    ]
  })

  return fromPairs(pairs)
}


//TODO: Check supported Configuration File
// https://eslint.org/docs/latest/use/configure/configuration-files
function existsEslintConfigInRepoRoot(srcDirPath: string): string | undefined {
  const filenames = [
    "eslint.config.js",
    "eslint.config.mjs",
    "eslint.config.cjs"
  ]
  return filenames.find(filename => existsSync(srcDirPath + path.sep + filename))
}

async function retrieveCodacyPatterns(set: "recommended" | "all" = "recommended"): Promise<Pattern[]> {
  const patterns: Pattern[] = [];
  const allRules = await getAllRules(true);
  Object.entries(allRules)
    .filter(([patternId, rule]) =>
      // problems with the path generated (win vs nix) for this specific pattern
      (!DEBUG || patternId != "spellcheck_spell-checker")
      && (set !== "recommended" || DocsGenerator.isDefaultPattern(patternIdToEslint(patternId), rule))
    )
    .forEach(([patternId, rule]) => {
      const pattern = new Pattern(
        patternId,
        DocsGenerator.generateParameters(patternId, getRuleMeta(rule)?.schema)
          .map((parameterSpec: ParameterSpec): Parameter => {
            return new Parameter(
              parameterSpec.name,
              parameterSpec.default
            )
          })
      )
      patterns.push(pattern)
    })

  return patterns
}

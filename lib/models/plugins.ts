import { type Rule, Linter } from "eslint";
import type { TSESLint } from '@typescript-eslint/utils';

import { isBlacklisted } from "lib/models/blacklist.ts";
import { TerminalColor, wrapConsoleTextInColor } from "lib/utils/logging.ts";

export interface Plugin {
  packageName: string;
  name: string;
  module: TSESLint.Linter.Plugin;
}

// plugins that break the tool:
//   "eslint-plugin-canonical"
// plugins without rules (no point including them):
//   "eslint-plugin-header"
//   "eslint-plugin-html"
//   "eslint-plugin-markdown"
//   "eslint-plugin-vitest-globals"

const packageNames: string[] = [
  "@angular-eslint/eslint-plugin",
 // "@babel/eslint-plugin", no rule description found
  "@lwc/eslint-plugin-lwc",
//  "@salesforce/eslint-plugin-aura",
  "@salesforce/eslint-plugin-lightning",
  "@shopify/eslint-plugin",
  "@stylistic/eslint-plugin",
  "@tanstack/eslint-plugin-query",
  "@typescript-eslint/eslint-plugin",
  "eslint",
//  "eslint-plugin-awscdk", no rule description
  "eslint-plugin-backbone",
//  "eslint-plugin-cdk", deprecated
//  "eslint-plugin-chai-expect", no rule description
//  "eslint-plugin-chai-friendly", no rule description
//  "eslint-plugin-codeceptjs", deprecated
  "eslint-plugin-compat",
//  "eslint-plugin-css-modules", no rule description
  "eslint-plugin-cypress",
  "eslint-plugin-ember",
  "eslint-plugin-ember-suave",
  "eslint-plugin-es-x",
  "eslint-plugin-eslint-plugin",
  "eslint-plugin-filenames",
//  "eslint-plugin-flowtype",
//  "eslint-plugin-formatjs",
  "eslint-plugin-fp",
  "eslint-plugin-functional",
  "eslint-plugin-i18next",
  "eslint-plugin-import",
//  "eslint-plugin-import-alias",
//  "eslint-plugin-import-newlines",
  "eslint-plugin-jasmine",
  "eslint-plugin-jest",
  "eslint-plugin-jest-dom",
  "eslint-plugin-jest-extended",
  "eslint-plugin-jest-formatting",
//  "eslint-plugin-jira-ticket-todo-comment",
  "eslint-plugin-jsdoc",
  "eslint-plugin-jsonc",
//  "eslint-plugin-jsx",
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-lit",
  "eslint-plugin-lodash",
  "eslint-plugin-lodash-fp",
  "eslint-plugin-meteor",
  "eslint-plugin-mocha",
//  "eslint-plugin-monorepo", deprecated
  "eslint-plugin-n",
//  "eslint-plugin-no-only-tests", no rule description
  "eslint-plugin-no-unsanitized",
  "eslint-plugin-nuxt",
  "eslint-plugin-perfectionist",
  "eslint-plugin-playwright",
//  "eslint-plugin-prefer-arrow", deprecated
//  "eslint-plugin-prefer-object-spread", deprecated
//  "eslint-plugin-prettier", no rule description
//  "eslint-plugin-prettier-vue", no rule description
  "eslint-plugin-promise",
//  "eslint-plugin-ramda", No rule description, only implementation
  "eslint-plugin-react",
//  "eslint-plugin-react-hooks", no rule description found
  "eslint-plugin-react-native",
  "eslint-plugin-react-perf",
  "eslint-plugin-react-redux",
//  "eslint-plugin-react-refresh", no rule description
  "eslint-plugin-redux-saga",
  "eslint-plugin-regexp",
//  "eslint-plugin-relay",
//  "eslint-plugin-rxjs",
//  "eslint-plugin-rxjs-angular",
  "eslint-plugin-security",
  "eslint-plugin-security-node",
//  "eslint-plugin-simple-import-sort",
// Not yet supported by ESLint 9: https://www.npmjs.com/package/eslint-plugin-sonarjs?activeTab=readme
//  "eslint-plugin-sonarjs",
  "eslint-plugin-sort",
  "eslint-plugin-sort-destructure-keys",
//  "eslint-plugin-sort-imports-es6-autofix",
//  "eslint-plugin-sort-keys-custom-order-fix", deprecated
//  "eslint-plugin-sort-keys-fix", deprecated
//  "eslint-plugin-spellcheck", deprecated
  "eslint-plugin-storybook",
  "eslint-plugin-suitescript",
  "eslint-plugin-tailwindcss",
  "eslint-plugin-test-selectors",
  "eslint-plugin-testing-library",
//  "eslint-plugin-tsdoc", no rule description
//  "eslint-plugin-turbo", TO-DO: Build a rule parser for this plugin
  "eslint-plugin-typescript-sort-keys",
  "eslint-plugin-unicorn",
  "eslint-plugin-unused-imports",
  "eslint-plugin-vue",
  "eslint-plugin-vue-scoped-css",
  "eslint-plugin-vuejs-accessibility",
  "eslint-plugin-wdio",
  "eslint-plugin-xss",
  "eslint-plugin-yml",
//  "eslint-plugin-you-dont-need-lodash-underscore"
]

const baseRules: Map<string, Rule.RuleModule> = new Linter({configType: "eslintrc"}).getRules();

const plugins: Promise<Plugin[]> = Promise.all(packageNames.map(async (packageName) => {
  const moduleRaw = await import(packageName);
  const module: TSESLint.Linter.Plugin = moduleRaw.default ?? moduleRaw;
  const name = convertFromPackageName(packageName);

  if (packageName !== "eslint" && module?.rules === undefined) {
    console.log(wrapConsoleTextInColor(`No rules found for ${packageName}`, TerminalColor.Red), module);
  }

  return { packageName, name, module };
}));

async function getPluginsRules(): Promise<Record<string, TSESLint.LooseRuleDefinition>> {
  const plugins = await getAll();
  const pluginsRules: Record<string, TSESLint.LooseRuleDefinition> = {};

  plugins
    .forEach(plugin => {
      if (plugin.module.rules === undefined) return;

      for (const [ruleName, ruleModule] of Object.entries(plugin.module.rules)) {
        if (ruleModule !== undefined) {
          pluginsRules[`${plugin.name}/${ruleName}`] = ruleModule;
        }
      }
    });

  return pluginsRules;
}

export async function getByPackageName (packageName: string): Promise<Plugin | undefined> {
  return (await plugins).find(plugin => plugin.packageName === packageName);
}

export async function getAll (): Promise<Plugin[]> {
  return plugins;
}

export async function getAllNames (): Promise<string[]> {
  return (await plugins).map(plugin => plugin.name)
}

export async function getAllRules(withDeprecated: boolean = true): Promise<Record<string, TSESLint.LooseRuleDefinition>> {
  const pluginsRules = await getPluginsRules();
  const allRules: Record<string, TSESLint.LooseRuleDefinition> = {};

  // Add base rules
  baseRules.forEach((ruleModule, ruleName) => {
    allRules[ruleName] = ruleModule as TSESLint.LooseRuleDefinition;
  });

  // Add plugin rules
  Object.entries(pluginsRules).forEach(([patternId, ruleModule]) => {
    if (
      patternId
      && !isBlacklisted(patternId)
      && (!withDeprecated || !hasRuleMetaDeprecated(ruleModule))
    ) {
      allRules[patternId] = ruleModule;
    }
  });

  return allRules;
}

export function convertFromPackageName(packageName: string): string {
  return packageName.replace(/(\/eslint-plugin$|eslint-plugin-)/, "");
}

export function getRuleMeta(rule: TSESLint.LooseRuleDefinition): { [key: string]: any } | undefined {
  return (typeof rule !== 'function'
      && rule?.meta !== undefined
      && typeof rule.meta === 'object'
      && rule.meta !== null)
    ? rule.meta
    : undefined
}

function hasRuleMetaDeprecated(rule: TSESLint.LooseRuleDefinition): boolean {
  const meta = getRuleMeta(rule);
  return meta !== undefined && 
    'deprecated' in meta && 
    meta.deprecated === true;
}
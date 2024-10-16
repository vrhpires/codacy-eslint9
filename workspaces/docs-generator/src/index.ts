import { DocsGenerator, type DocsInfo } from "docs-generator/src/docsGenerator.ts"

const downloadDocs: DocsInfo[] = [
  {
    packageName: "@angular-eslint/eslint-plugin",
    relativeUrl: "/angular-eslint/angular-eslint/master/packages/eslint-plugin/docs/rules/"
  },
  {
    packageName: "@lwc/eslint-plugin-lwc",
    relativeUrl: "/salesforce/eslint-plugin-lwc/master/docs/rules/"
  },
  {
    packageName: "@salesforce/eslint-plugin-lightning",
    relativeUrl: "/salesforce/eslint-plugin-lightning/master/docs/rules/"
  },
  {
    packageName: "@shopify/eslint-plugin",
    relativeUrl: "/Shopify/web-configs/main/packages/eslint-plugin/docs/rules/",
    versionPrefix: "@shopify/eslint-plugin@"
  },
  {
    packageName: "@stylistic/eslint-plugin",
    relativeUrl: "/eslint-stylistic/eslint-stylistic/main/"
  },
  {
    packageName: "@tanstack/eslint-plugin-query",
    relativeUrl: "/TanStack/query/main/docs/eslint/"
  },
  {
    packageName: "@typescript-eslint/eslint-plugin",
    relativeUrl: "/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/docs/rules/"
  },
  {
     packageName:"eslint-plugin-sonarjs",
     relativeUrl: "/SonarSource/eslint-plugin-sonarjs/master/docs/rules/"
  },
  {
    packageName: "@vitest/eslint-plugin",
    relativeUrl: "/vitest-dev/eslint-plugin-vitest/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-backbone",
    relativeUrl: "/ilyavolodin/eslint-plugin-backbone/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-compat",
    relativeUrl: "/amilajack/eslint-plugin-compat/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-cypress",
    relativeUrl: "/cypress-io/eslint-plugin-cypress/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-ember",
    relativeUrl: "/ember-cli/eslint-plugin-ember/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-ember-suave",
    relativeUrl: "/DockYard/eslint-plugin-ember-suave/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-es-x",
    relativeUrl: "/eslint-community/eslint-plugin-es-x/master/docs/rules/"
  },
  {
    packageName: "eslint",
    relativeUrl: "/eslint/eslint/main/docs/src/rules/"
  },
  {
    packageName: "eslint-plugin-eslint-plugin",
    relativeUrl: "/eslint-community/eslint-plugin-eslint-plugin/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-functional",
    relativeUrl: "/jonaskello/eslint-plugin-functional/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-i18next",
    relativeUrl: "/edvardchen/eslint-plugin-i18next/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-import",
    relativeUrl: "/un-es/eslint-plugin-i/fork-release/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jasmine",
    relativeUrl: "/tlvince/eslint-plugin-jasmine/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jest",
    relativeUrl: "/jest-community/eslint-plugin-jest/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jest-dom",
    relativeUrl: "/testing-library/eslint-plugin-jest-dom/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jest-extended",
    relativeUrl: "/jest-community/eslint-plugin-jest-extended/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jest-formatting",
    relativeUrl: "/dangreenisrael/eslint-plugin-jest-formatting/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jsdoc",
    relativeUrl: "/gajus/eslint-plugin-jsdoc/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jsonc",
    relativeUrl: "/ota-meshi/eslint-plugin-jsonc/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-fp",
    relativeUrl: "/jfmengels/eslint-plugin-fp/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-playwright",
    relativeUrl: "/playwright-community/eslint-plugin-playwright/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-jsx-a11y",
    relativeUrl: "/jsx-eslint/eslint-plugin-jsx-a11y/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-lit",
    relativeUrl: "/43081j/eslint-plugin-lit/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-lodash",
    relativeUrl: "/idok/eslint-plugin-lodash/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-lodash-fp",
    relativeUrl: "/jfmengels/eslint-plugin-lodash-fp/master/docs/rules/",
    versionPrefix: false
  },
  {
    packageName: "eslint-plugin-meteor",
    relativeUrl: "/dferber90/eslint-plugin-meteor/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-mocha",
    relativeUrl: "/lo1tuma/eslint-plugin-mocha/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-n",
    relativeUrl: "/eslint-community/eslint-plugin-n/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-nuxt",
    relativeUrl: "/nuxt/eslint-plugin-nuxt/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-perfectionist",
    relativeUrl: "/azat-io/eslint-plugin-perfectionist/main/docs/content/rules/"
  },
  {
    packageName: "eslint-plugin-promise",
    relativeUrl: "/xjamundx/eslint-plugin-promise/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-react",
    relativeUrl: "/jsx-eslint/eslint-plugin-react/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-react-perf",
    relativeUrl: "/cvazac/eslint-plugin-react-perf/master/docs/rules/",
    versionPrefix: false
  },
  {
    packageName: "eslint-plugin-react-redux",
    relativeUrl: "/DianaSuvorova/eslint-plugin-react-redux/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-redux-saga",
    relativeUrl: "/pke/eslint-plugin-redux-saga/master/docs/rules/",
    versionPrefix: false
  },
  {
    packageName: "eslint-plugin-regexp",
    relativeUrl: "/ota-meshi/eslint-plugin-regexp/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-security",
    relativeUrl: "/eslint-community/eslint-plugin-security/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-security-node",
    relativeUrl: "/gkouziik/eslint-plugin-security-node/master/docs/rules/",
    versionPrefix: ""
  },
  {
    packageName: "eslint-plugin-sort",
    relativeUrl: "/mskelton/eslint-plugin-sort/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-sort-destructure-keys",
    relativeUrl: "/mthadley/eslint-plugin-sort-destructure-keys/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-storybook",
    relativeUrl: "/storybookjs/eslint-plugin-storybook/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-suitescript",
    relativeUrl: "/acdvs/eslint-plugin-suitescript/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-tailwindcss",
    relativeUrl: "/francoismassart/eslint-plugin-tailwindcss/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-test-selectors",
    relativeUrl: "/davidcalhoun/eslint-plugin-test-selectors/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-testing-library",
    relativeUrl: "/testing-library/eslint-plugin-testing-library/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-typescript-sort-keys",
    relativeUrl: "/infctr/eslint-plugin-typescript-sort-keys/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-unicorn",
    relativeUrl: "/sindresorhus/eslint-plugin-unicorn/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-unused-imports",
    relativeUrl: "/sweepline/eslint-plugin-unused-imports/master/docs/rules/",
    versionPrefix: false
  },
  {
    packageName: "eslint-plugin-vue",
    relativeUrl: "/vuejs/eslint-plugin-vue/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-vue-scoped-css",
    relativeUrl: "/future-architect/eslint-plugin-vue-scoped-css/master/docs/rules/"
  },
  {
    packageName: "eslint-plugin-vuejs-accessibility",
    relativeUrl: "/vue-a11y/eslint-plugin-vuejs-accessibility/main/docs/rules/"
  },
  {
    packageName: "eslint-plugin-wdio",
    relativeUrl: "/webdriverio/webdriverio/main/packages/eslint-plugin-wdio/docs/rules/"
  },
  {
    packageName: "eslint-plugin-xss",
    relativeUrl: "/Rantanen/eslint-plugin-xss/master/docs/rules/",
    versionPrefix: false
  },
  {
    packageName: "eslint-plugin-yml",
    relativeUrl: "/ota-meshi/eslint-plugin-yml/master/docs/rules/"
  }
];

async function main () {
  try {
    const docGenerator = new DocsGenerator()

    await docGenerator.createDescriptionFile()
    await docGenerator.createPatternsFile()
    await docGenerator.createAllPatternsMultipleTestFiles()
    await docGenerator.downloadAllPluginsDocs(downloadDocs);

  } catch (error) { 
    console.error(error);
  }
 
}

main();

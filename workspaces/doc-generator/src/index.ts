import { DocGenerator, type DownloadDocsInfo } from "./DocGenerator.ts"

const downloadDocs: DownloadDocsInfo[] = [
  {
    packageName: "@angular-eslint/eslint-plugin",
    docs: {
      relativeUrl: "/angular-eslint/angular-eslint/master/packages/eslint-plugin/docs/rules/"
    }
  },
  {
    packageName: "@lwc/eslint-plugin-lwc",
    docs: {
      relativeUrl: "/salesforce/eslint-plugin-lwc/master/docs/rules/"
    }
  },
  {
    packageName: "@salesforce/eslint-plugin-aura",
    docs: {
      relativeUrl: "/forcedotcom/eslint-plugin-aura/master/docs/rules/"
    }
  },
  {
    packageName: "@salesforce/eslint-plugin-lightning",
    docs: {
      relativeUrl: "/salesforce/eslint-plugin-lightning/master/docs/rules/"
    }
  },
  {
    packageName: "@shopify/eslint-plugin",
    docs: {
      relativeUrl: "/Shopify/web-configs/main/packages/eslint-plugin/docs/rules/",
      versionPrefix: "@shopify/eslint-plugin@"
    }
  },
  {
    packageName: "@stylistic/eslint-plugin",
    docs: {
      relativeUrl: "/eslint-stylistic/eslint-stylistic/main/"
    }
  },
  {
    packageName: "@tanstack/eslint-plugin-query",
    docs: {
      relativeUrl: "/TanStack/query/main/docs/eslint/"
    }
  },
  {
    packageName: "@typescript-eslint/eslint-plugin",
    docs: {
      relativeUrl: "/typescript-eslint/typescript-eslint/v8/packages/eslint-plugin/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-backbone",
    docs: {
      relativeUrl: "/ilyavolodin/eslint-plugin-backbone/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-compat",
    docs: {
      relativeUrl: "/amilajack/eslint-plugin-compat/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-cypress",
    docs: {
      relativeUrl: "/cypress-io/eslint-plugin-cypress/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-ember",
    docs: {
      relativeUrl: "/ember-cli/eslint-plugin-ember/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-ember-suave",
    docs: {
      relativeUrl: "/DockYard/eslint-plugin-ember-suave/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-es-x",
    docs: {
      relativeUrl: "/eslint-community/eslint-plugin-es-x/master/docs/rules/"
    }
  },
  {
    packageName: "eslint",
    docs: {
      relativeUrl: "/eslint/eslint/main/docs/src/rules/"
    }
  },
  {
    packageName: "eslint-plugin-eslint-plugin",
    docs: {
      relativeUrl: "/eslint-community/eslint-plugin-eslint-plugin/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-functional",
    docs: {
      relativeUrl: "/jonaskello/eslint-plugin-functional/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-i18next",
    docs: {
      relativeUrl: "/edvardchen/eslint-plugin-i18next/next/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-import",
    docs: {
      relativeUrl: "/un-es/eslint-plugin-i/fork-release/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jasmine",
    docs: {
      relativeUrl: "/tlvince/eslint-plugin-jasmine/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jest",
    docs: {
      relativeUrl: "/jest-community/eslint-plugin-jest/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jest-dom",
    docs: {
      relativeUrl: "/testing-library/eslint-plugin-jest-dom/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jest-extended",
    docs: {
      relativeUrl: "/jest-community/eslint-plugin-jest-extended/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jest-formatting",
    docs: {
      relativeUrl: "/dangreenisrael/eslint-plugin-jest-formatting/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jsdoc",
    docs: {
      relativeUrl: "/gajus/eslint-plugin-jsdoc/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jsonc",
    docs: {
      relativeUrl: "/ota-meshi/eslint-plugin-jsonc/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-jsx-a11y",
    docs: {
      relativeUrl: "/jsx-eslint/eslint-plugin-jsx-a11y/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-lit",
    docs: {
      relativeUrl: "/43081j/eslint-plugin-lit/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-lodash",
    docs: {
      relativeUrl: "/idok/eslint-plugin-lodash/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-lodash-fp",
    docs: {
      relativeUrl: "/jfmengels/eslint-plugin-lodash-fp/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-meteor",
    docs: {
      relativeUrl: "/dferber90/eslint-plugin-meteor/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-mocha",
    docs: {
      relativeUrl: "/lo1tuma/eslint-plugin-mocha/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-n",
    docs: {
      relativeUrl: "/eslint-community/eslint-plugin-n/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-no-unsanitized",
    docs: {
      relativeUrl: "/mozilla/eslint-plugin-no-unsanitized/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-nuxt",
    docs: {
      relativeUrl: "/nuxt/eslint-plugin-nuxt/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-perfectionist",
    docs: {
      relativeUrl: "/azat-io/eslint-plugin-perfectionist/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-promise",
    docs: {
      relativeUrl: "/xjamundx/eslint-plugin-promise/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-react",
    docs: {
      relativeUrl: "/jsx-eslint/eslint-plugin-react/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-react-native",
    docs: {
      relativeUrl: "/Intellicode/eslint-plugin-react-native/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-react-perf",
    docs: {
      relativeUrl: "/cvazac/eslint-plugin-react-perf/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-react-redux",
    docs: {
      relativeUrl: "/DianaSuvorova/eslint-plugin-react-redux/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-redux-saga",
    docs: {
      relativeUrl: "/pke/eslint-plugin-redux-saga/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-regexp",
    docs: {
      relativeUrl: "/ota-meshi/eslint-plugin-regexp/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-rxjs",
    docs: {
      relativeUrl: "/cartant/eslint-plugin-rxjs/main/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-rxjs-angular",
    docs: {
      relativeUrl: "/cartant/eslint-plugin-rxjs-angular/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-security",
    docs: {
      relativeUrl: "/eslint-community/eslint-plugin-security/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-security-node",
    docs: {
      relativeUrl: "/gkouziik/eslint-plugin-security-node/master/docs/rules/",
    versionPrefix: ""
    }
  },
  {
    packageName: "eslint-plugin-sonarjs",
    docs: {
      relativeUrl: "/SonarSource/eslint-plugin-sonarjs/master/docs/rules/",
    versionPrefix: ""
    }
  },
  {
    packageName: "eslint-plugin-sort",
    docs: {
      relativeUrl: "/mskelton/eslint-plugin-sort/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-sort-destructure-keys",
    docs: {
      relativeUrl: "/mthadley/eslint-plugin-sort-destructure-keys/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-storybook",
    docs: {
      relativeUrl: "/storybookjs/eslint-plugin-storybook/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-suitescript",
    docs: {
      relativeUrl: "/acdvs/eslint-plugin-suitescript/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-tailwindcss",
    docs: {
      relativeUrl: "/francoismassart/eslint-plugin-tailwindcss/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-test-selectors",
    docs: {
      relativeUrl: "/davidcalhoun/eslint-plugin-test-selectors/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-testing-library",
    docs: {
      relativeUrl: "/testing-library/eslint-plugin-testing-library/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-typescript-sort-keys",
    docs: {
      relativeUrl: "/infctr/eslint-plugin-typescript-sort-keys/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-unicorn",
    docs: {
      relativeUrl: "/sindresorhus/eslint-plugin-unicorn/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-unused-imports",
    docs: {
      relativeUrl: "/sweepline/eslint-plugin-unused-imports/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-vue",
    docs: {
      relativeUrl: "/vuejs/eslint-plugin-vue/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-vue-scoped-css",
    docs: {
      relativeUrl: "/future-architect/eslint-plugin-vue-scoped-css/master/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-vuejs-accessibility",
    docs: {
      relativeUrl: "/vue-a11y/eslint-plugin-vuejs-accessibility/main/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-wdio",
    docs: {
      relativeUrl: "/webdriverio/webdriverio/main/packages/eslint-plugin-wdio/docs/rules/"
    }
  },
  {
    packageName: "eslint-plugin-xss",
    docs: {
      relativeUrl: "/Rantanen/eslint-plugin-xss/master/docs/rules/",
      versionPrefix: false
    }
  },
  {
    packageName: "eslint-plugin-yml",
    docs: {
      relativeUrl: "/ota-meshi/eslint-plugin-yml/master/docs/rules/"
    }
  }
];

async function main () {
  try {
    const docGenerator = new DocGenerator()

    await docGenerator.createDescriptionFile()
    await docGenerator.createPatternsFile()
    await docGenerator.createAllPatternsMultipleTestFiles()
    await docGenerator.downloadAllPluginsDocs(downloadDocs);

  } catch (error) { 
    console.error(error);
  }
 
}

main();

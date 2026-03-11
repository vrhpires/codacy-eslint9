import { DocsGenerator } from "docs-generator/src/docsGenerator.ts"

async function main() {
  try {
    const docGenerator = new DocsGenerator()

    await docGenerator.createDescriptionFile()
    await docGenerator.createPatternsFile()
    await docGenerator.createAllPatternsMultipleTestFiles()

    await docGenerator.downloadPluginDocs({
      packageName: "@angular-eslint/eslint-plugin",
      relativeUrl: "/angular-eslint/angular-eslint/master/packages/eslint-plugin/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@lwc/eslint-plugin-lwc",
      relativeUrl: "/salesforce/eslint-plugin-lwc/refs/tags/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@salesforce/eslint-plugin-lightning",
      relativeUrl: "/salesforce/eslint-plugin-lightning/master/docs/rules/",
      versionPrefix: "v",
    })

    await docGenerator.downloadPluginDocs({
      packageName: "@shopify/eslint-plugin",
      relativeUrl: "/Shopify/web-configs/refs/tags/main/packages/eslint-plugin/docs/rules/",
      versionPrefix: "%40shopify/eslint-plugin%40"
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@stylistic/eslint-plugin",
      relativeUrl: "/eslint-stylistic/eslint-stylistic/main/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@tanstack/eslint-plugin-query",
      relativeUrl: "/TanStack/query/main/docs/eslint/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@typescript-eslint/eslint-plugin",
      relativeUrl: "/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-svelte",
      relativeUrl: "/sveltejs/eslint-plugin-svelte/refs/tags/main/docs/rules/",
      versionPrefix: "eslint-plugin-svelte%40",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "@vitest/eslint-plugin",
      relativeUrl: "/vitest-dev/eslint-plugin-vitest/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-check-file",
      relativeUrl: "/dukeluo/eslint-plugin-check-file/refs/tags/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-angular",
      relativeUrl: "/EmmanuelDemey/eslint-plugin-angular/refs/tags/master/docs/rules/",
      versionPrefix: "",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-ava",
      relativeUrl: "/avajs/eslint-plugin-ava/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-backbone",
      relativeUrl: "/ilyavolodin/eslint-plugin-backbone/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-compat",
      relativeUrl: "/amilajack/eslint-plugin-compat/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-cypress",
      relativeUrl: "/cypress-io/eslint-plugin-cypress/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-ember",
      relativeUrl: "/ember-cli/eslint-plugin-ember/refs/heads/master/docs/rules/",
      versionPrefix: false,
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-ember-suave",
      relativeUrl: "/DockYard/eslint-plugin-ember-suave/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-es-x",
      relativeUrl: "/eslint-community/eslint-plugin-es-x/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-expect-type",
      relativeUrl: "/JoshuaKGoldberg/eslint-plugin-expect-type/refs/tags/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint",
      relativeUrl: "/eslint/eslint/refs/tags/main/docs/src/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-eslint-plugin",
      relativeUrl: "/eslint-community/eslint-plugin-eslint-plugin/refs/tags/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-functional",
      relativeUrl: "/jonaskello/eslint-plugin-functional/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-i18next",
      relativeUrl: "/edvardchen/eslint-plugin-i18next/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-import",
      relativeUrl: "/un-es/eslint-plugin-i/fork-release/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jasmine",
      relativeUrl: "/tlvince/eslint-plugin-jasmine/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jest",
      relativeUrl: "/jest-community/eslint-plugin-jest/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jest-dom",
      relativeUrl: "/testing-library/eslint-plugin-jest-dom/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jest-extended",
      relativeUrl: "/jest-community/eslint-plugin-jest-extended/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jest-formatting",
      relativeUrl: "/dangreenisrael/eslint-plugin-jest-formatting/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jsdoc",
      relativeUrl: "/gajus/eslint-plugin-jsdoc/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jsonc",
      relativeUrl: "/ota-meshi/eslint-plugin-jsonc/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-fp",
      relativeUrl: "/jfmengels/eslint-plugin-fp/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-playwright",
      relativeUrl: "/playwright-community/eslint-plugin-playwright/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-jsx-a11y",
      relativeUrl: "/jsx-eslint/eslint-plugin-jsx-a11y/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-lit",
      relativeUrl: "/43081j/eslint-plugin-lit/refs/tags/master/docs/rules/",
      versionPrefix: ""
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-lodash",
      relativeUrl: "/idok/eslint-plugin-lodash/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-lodash-fp",
      relativeUrl: "/jfmengels/eslint-plugin-lodash-fp/master/docs/rules/",
      versionPrefix: false
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-meteor",
      relativeUrl: "/dferber90/eslint-plugin-meteor/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-mocha",
      relativeUrl: "/lo1tuma/eslint-plugin-mocha/refs/tags/main/docs/rules/",
      versionPrefix: "",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-n",
      relativeUrl: "/eslint-community/eslint-plugin-n/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-nuxt",
      relativeUrl: "/nuxt/eslint-plugin-nuxt/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-perfectionist",
      relativeUrl: "/azat-io/eslint-plugin-perfectionist/main/docs/content/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-promise",
      relativeUrl: "/xjamundx/eslint-plugin-promise/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-react",
      relativeUrl: "/jsx-eslint/eslint-plugin-react/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-react-perf",
      relativeUrl: "/cvazac/eslint-plugin-react-perf/master/docs/rules/",
      versionPrefix: false
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-react-redux",
      relativeUrl: "/DianaSuvorova/eslint-plugin-react-redux/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-redux-saga",
      relativeUrl: "/pke/eslint-plugin-redux-saga/master/docs/rules/",
      versionPrefix: false
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-regexp",
      relativeUrl: "/ota-meshi/eslint-plugin-regexp/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-security",
      relativeUrl: "/eslint-community/eslint-plugin-security/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-security-node",
      relativeUrl: "/gkouziik/eslint-plugin-security-node/master/docs/rules/",
      versionPrefix: ""
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-sort",
      relativeUrl: "/mskelton/eslint-plugin-sort/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-sort-destructure-keys",
      relativeUrl: "/mthadley/eslint-plugin-sort-destructure-keys/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-storybook",
      relativeUrl: "/storybookjs/eslint-plugin-storybook/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-suitescript",
      relativeUrl: "/acdvs/eslint-plugin-suitescript/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-tailwindcss",
      relativeUrl: "/francoismassart/eslint-plugin-tailwindcss/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-test-selectors",
      relativeUrl: "/davidcalhoun/eslint-plugin-test-selectors/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-testing-library",
      relativeUrl: "/testing-library/eslint-plugin-testing-library/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-typescript-sort-keys",
      relativeUrl: "/infctr/eslint-plugin-typescript-sort-keys/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-unicorn",
      relativeUrl: "/sindresorhus/eslint-plugin-unicorn/refs/tags/main/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-unused-imports",
      relativeUrl: "/sweepline/eslint-plugin-unused-imports/master/docs/rules/",
      versionPrefix: false
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-vue",
      relativeUrl: "/vuejs/eslint-plugin-vue/refs/tags/master/docs/rules/",
      versionPrefix: "v",
    })
    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-vuetify",
      relativeUrl: "/vuetifyjs/eslint-plugin-vuetify/refs/tags/master/docs/rules/",
      versionPrefix: "v",
    })

    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-vue-scoped-css",
      relativeUrl: "/future-architect/eslint-plugin-vue-scoped-css/master/docs/rules/",
      versionPrefix: "v",
    })

    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-vuejs-accessibility",
      relativeUrl: "/vue-a11y/eslint-plugin-vuejs-accessibility/main/docs/rules/",
      versionPrefix: "v",
    })

    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-wdio",
      relativeUrl: "/webdriverio/webdriverio/main/packages/eslint-plugin-wdio/docs/rules/",
      versionPrefix: "v",
    })

    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-xss",
      relativeUrl: "/Rantanen/eslint-plugin-xss/master/docs/rules/",
      versionPrefix: false
    })

    await sleep(500)


    await docGenerator.downloadPluginDocs({
      packageName: "eslint-plugin-yml",
      relativeUrl: "/ota-meshi/eslint-plugin-yml/master/docs/rules/",
      versionPrefix: "v",
    })

    await sleep(500)

    await docGenerator.downloadPluginDocs({
      packageName: "eslint",
      relativeUrl: "/eslint/eslint/refs/tags/master/docs/src/rules/",
      versionPrefix: "v",
    })

  } catch (error) {
    console.error(error);
  }

}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve =>
    setTimeout(resolve, ms));
}

main();
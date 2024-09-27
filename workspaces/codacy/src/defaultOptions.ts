import type { TSESLint } from '@typescript-eslint/utils';
import tseslint from 'typescript-eslint';

export const baseConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: "codacy/default",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      parser: tseslint.parser,
      parserOptions: {
        allowInvalidAST: true,
        allowAutomaticSingleRunInference: true,
        errorOnTypeScriptSyntacticAndSemanticIssues: false
      },
      globals: {
        "document": "readonly",
        "navigator": "readonly",
        "window": "readonly",
    
        // ECMAScript
        "ArrayBuffer": "readonly",
        "Atomics": "readonly",
        "BigInt": "readonly",
        "BigInt64Array": "readonly",
        "BigUint64Array": "readonly",
        "DataView": "readonly",
        "Float32Array": "readonly",
        "Float64Array": "readonly",
        "Int16Array": "readonly",
        "Int32Array": "readonly",
        "Int8Array": "readonly",
        "Map": "readonly",
        "Promise": "readonly",
        "Proxy": "readonly",
        "Reflect": "readonly",
        "Set": "readonly",
        "SharedArrayBuffer": "readonly",
        "Symbol": "readonly",
        "Uint16Array": "readonly",
        "Uint32Array": "readonly",
        "Uint8Array": "readonly",
        "Uint8ClampedArray": "readonly",
        "WeakMap": "readonly",
        "WeakSet": "readonly",
    
        // ECMAScript (experimental)
        "globalThis": "readonly",
    
        // ECMA-402
        "Intl": "readonly",
    
        // Web Standard
        "TextDecoder": "readonly",
        "TextEncoder": "readonly",
        "URL": "readonly",
        "URLSearchParams": "readonly",
        "WebAssembly": "readonly",
        "clearInterval": "readonly",
        "clearTimeout": "readonly",
        "console": "readonly",
        "queueMicrotask": "readonly",
        "setInterval": "readonly",
        "setTimeout": "readonly",
    
        // Node.js
        "Buffer": "readonly",
        "GLOBAL": "readonly",
        "clearImmediate": "readonly",
        "global": "readonly",
        "process": "readonly",
        "root": "readonly",
        "setImmediate": "readonly",
    
        // Backbone
        "Backbone": false,
        "_": false,
    
        // Cypress
        "cypress/globals": true
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: false
    },
    settings: {
      "node": {
        "paths": ["/src"],
        "extensions": [".ts", ".tsx", ".js", ".jsx", ".json", ".node", ".mjs", ".cjs", ".mts", ".cts"],
        "tryExtensions": [".ts", ".tsx", ".js", ".jsx", ".json", ".node", ".mjs", ".cjs", ".mts", ".cts"]
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts", ".node"]
        },
        "typescript": {
          "alwaysTryTypes": true
        },
        "webpack": true
      },
      "jest": {
        "version": 29
      },
      "react": {
        "version": "18.2.0"
      }
    },
  },
  {
    // TypeScript-specific rules
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        project: "/tsconfig.json"
      },
    },
    rules: {
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
      "constructor-super": "off",
      "getter-return": "off",
      "no-const-assign": "off",
      "no-dupe-args": "off",
      "no-dupe-class-members": "off",
      "no-dupe-keys": "off",
      "no-func-assign": "off",
      "no-import-assign": "off",
      "no-new-symbol": "off",
      "no-obj-calls": "off",
      "no-redeclare": "off",
      "no-setter-return": "off",
      "no-this-before-super": "off",
      "no-undef": "off",
      "no-unreachable": "off",
      "no-unsafe-negation": "off"
    }
  },
  {
    // JavaScript-specific rules
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.json"],
    rules: {
      // https://github.com/typescript-eslint/typescript-eslint/blob/e44a1a280f08f9fd0d29f74e5c3e73b7b64a9606/packages/eslint-plugin/src/configs/disable-type-checked.ts#L12
      // turn off other type-aware rules
      "functional/prefer-tacit": "off",
      "jest/unbound-method": "off",
      "rxjs/finnish": "off",
      "rxjs/no-async-subscribe": "off",
      "rxjs/no-connectable": "off",
      "rxjs/no-create": "off",
      "rxjs/no-cyclic-action": "off",
      "rxjs/no-exposed-subjects": "off",
      "rxjs/no-finnish": "off",
      "rxjs/no-ignored-error": "off",
      "rxjs/no-ignored-notifier": "off",
      "rxjs/no-ignored-takewhile-value": "off",
      "rxjs/no-ignored-observable": "off",
      "rxjs/no-ignored-replay-buffer": "off",
      "rxjs/no-ignored-subscribe": "off",
      "rxjs/no-ignored-subscription": "off",
      "rxjs/no-implicit-any-catch": "off",
      "rxjs/no-index": "off",
      "rxjs/no-internal": "off",
      "rxjs/no-nested-subscribe": "off",
      "rxjs/no-redundant-notify": "off",
      "rxjs/no-sharereplay": "off",
      "rxjs/no-subclass": "off",
      "rxjs/no-subject-unsubscribe": "off",
      "rxjs/no-subject-value": "off",
      "rxjs/no-subscribe-handlers": "off",
      "rxjs/no-topromise": "off",
      "rxjs/no-unbound-methods": "off",
      "rxjs/no-unsafe-catch": "off",
      "rxjs/no-unsafe-first": "off",
      "rxjs/no-unsafe-subject-next": "off",
      "rxjs/no-unsafe-switchmap": "off",
      "rxjs/no-unsafe-takeuntil": "off",
      "rxjs/prefer-observer": "off",
      "rxjs/suffix-subjects": "off",
      "rxjs/throw-error": "off",
      "rxjs-angular/prefer-async-pipe": "off",
      "rxjs-angular/prefer-composition": "off",
      "rxjs-angular/prefer-takeuntil": "off",
      // turn off rules that don't apply to JS code
      "deprecation/deprecation": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/consistent-type-exports": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-for-in-array": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-meaningless-void-operator": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-mixed-enums": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-qualifier": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-return-this-type": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      "@typescript-eslint/promise-function-async": "off",
      "@typescript-eslint/require-array-sort-compare": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "off",
      "@typescript-eslint/unbound-method": "off"
    }
  },
  {
    // JSON-specific rules
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      "json/json": "off"
    }
  } 
]



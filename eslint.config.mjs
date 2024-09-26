// @ts-check

import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import prettier from 'eslint-config-prettier';


export default tseslint.config(
    {
        ignores: [
            "node_modules/",
            "app/node_modules/",
            "dist/",
            "tests/",
            "tsconfig.json",
            "eslint.config.*",
            ".eslintignore"
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            globals: globals.node,
            parserOptions: {
                project: true,
                projectService: true,
                sourceType: 'module',
                programs: null
            }
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
        rules: {
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
);

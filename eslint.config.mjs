// @ts-check

import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import prettier from 'eslint-config-prettier';


export default tseslint.config(
    {
        ignores: [
            "node_modules/",
            "dist/",
            "tests/",
            "tsconfig.json",
            "eslint.config.*"
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
                sourceType: 'module',
                programs: null
            }
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
);
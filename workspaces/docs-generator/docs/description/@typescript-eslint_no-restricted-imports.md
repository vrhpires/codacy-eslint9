---
description: 'Disallow specified modules when loaded by `import`.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-restricted-imports** for documentation.

It adds support for type import syntaxes:

- ``
- ``
- `import x = require("...")`

## Options

This rule adds the following options:

### `allowTypeImports`

<!-- insert option description -->

Whether to allow type-only imports for a path.
Default: `false`.

You can specify this option for a specific path or pattern as follows:

```jsonc
{
  "rules": {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "import-foo",
            "message": "Please use import-bar instead.",
            "allowTypeImports": true,
          },
          {
            "name": "import-baz",
            "message": "Please use import-quux instead.",
            "allowTypeImports": true,
          },
        ],
      },
    ],
  },
}
```

Whether to allow [Type-Only Imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export).

Examples of code with the above config:

<!--tabs-->

#### ❌ Incorrect

```ts option='{"paths":[{"name":"import-foo","message":"Please use import-bar instead.","allowTypeImports":true},{"name":"import-baz","message":"Please use import-quux instead.","allowTypeImports":true}]}'

export { Foo } from 'import-foo';

export { Baz } from 'import-baz';
```

#### ✅ Correct

```ts option='{"paths":[{"name":"import-foo","message":"Please use import-bar instead.","allowTypeImports":true},{"name":"import-baz","message":"Please use import-quux instead.","allowTypeImports":true}]}'

export type { Foo } from 'import-foo';

export type { Baz } from 'import-baz';
```

<!--/tabs-->


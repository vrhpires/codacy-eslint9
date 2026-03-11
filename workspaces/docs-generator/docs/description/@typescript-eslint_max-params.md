---
description: 'Enforce a maximum number of parameters in function definitions.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/max-params** for documentation.

It adds support for TypeScript `this` parameters so they won't be counted as a parameter.

## Options

This rule adds the following options:

```ts
interface Options extends BaseMaxParamsOptions {
  countVoidThis?: boolean;
}

const defaultOptions: Options = {
  ...baseMaxParamsOptions,
  countVoidThis: false,
};
```

### `countVoidThis`

<!-- insert option description -->

Example of a code when `countVoidThis` is set to `false` and `max` is `1`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "countVoidThis": false, "max": 1 }'
function hasNoThis(this: void, first: string, second: string) {
  // ...
}
```

#### ✅ Correct

```ts option='{ "countVoidThis": false, "max": 1 }'
function hasNoThis(this: void, first: string) {
  // ...
}
```

<!--/tabs-->


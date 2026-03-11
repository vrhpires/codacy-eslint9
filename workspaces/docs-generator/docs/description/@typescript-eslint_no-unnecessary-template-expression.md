---
description: 'Disallow unnecessary template expressions.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-unnecessary-template-expression** for documentation.

This rule reports template literals that contain substitution expressions (also variously referred to as embedded expressions or string interpolations) that are unnecessary and can be simplified.

:::info[Migration from `no-useless-template-literals`]

This rule was formerly known as [`no-useless-template-literals`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-useless-template-literals.mdx).
The new name is a drop-in replacement with identical functionality.

:::

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
// Static values can be incorporated into the surrounding template.

const ab1 = `${'a'}${'b'}`;
const ab2 = `a${'b'}`;
type AB1 = `${'A'}${'B'}`;
type AB2 = `A${'B'}`;

const stringWithNumber = `${'1 + 1 = '}${2}`;

const stringWithBoolean = `${'true is '}${true}`;

// Some simple expressions that are already strings
// can be rewritten without a template at all.

const text = 'a';
const wrappedText = `${text}`;
type Text = 'A';
type WrappedText = `${Text}`;

declare const intersectionWithString: string & { _brand: 'test-brand' };
const wrappedIntersection = `${intersectionWithString}`;
type IntersectionWithString = string & { _brand: 'test-brand' };
type WrappedIntersection = `${IntersectionWithString}`;
```

#### ✅ Correct

```ts
// Static values can be incorporated into the surrounding template.

const ab1 = `ab`;
const ab2 = `ab`;
type AB = `AB`;

// Transforming enum members into string unions using template literals is allowed.
enum ABC {
  A = 'A',
  B = 'B',
  C = 'C',
}
type ABCUnion = `${ABC}`;
type A = `${ABC.A}`;

// Interpolating type parameters is allowed.
type TextUtil<T extends string> = `${T}`;

const stringWithNumber = `1 + 1 = 2`;

const stringWithBoolean = `true is true`;

// Some simple expressions that are already strings
// can be rewritten without a template at all.

const text = 'a';
const wrappedText = text;
type Text = 'A';
type WrappedText = Text;

declare const intersectionWithString: string & { _brand: 'test-brand' };
const wrappedIntersection = intersectionWithString;
type IntersectionWithString = string & { _brand: 'test-brand' };
type WrappedIntersection = IntersectionWithString;
```

<!--/tabs-->

:::info
This rule does not aim to flag template literals without substitution expressions that could have been written as an ordinary string.
That is to say, this rule will not help you turn `` `this` `` into `"this"`.
If you are looking for such a rule, you can configure the [`@stylistic/ts/quotes`](https://eslint.style/rules/ts/quotes) rule to do this.
:::

## When Not To Use It

When you want to allow string expressions inside template literals.

## Related To

- [`restrict-template-expressions`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.mdx)
- [`@stylistic/ts/quotes`](https://eslint.style/rules/ts/quotes)

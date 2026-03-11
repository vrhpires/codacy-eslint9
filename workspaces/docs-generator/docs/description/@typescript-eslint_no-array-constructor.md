---
description: 'Disallow generic `Array` constructors.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-array-constructor** for documentation.

It adds support for the generically typed `Array` constructor (`new Array<Foo>()`).

<!--tabs-->

#### ❌ Incorrect

```ts
Array(0, 1, 2);
new Array(0, 1, 2);
```

#### ✅ Correct

```ts
Array<number>(0, 1, 2);
new Array<Foo>(x, y, z);

Array(500);
new Array(someOtherArray.length);
```

<!--/tabs-->


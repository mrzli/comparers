# Comparers

This library contains some comparison functions.

## Installation

```bash
npm install --save @gmjs/comparers
```

## Usage

```ts
import { compareNumberAsc } from '@gmjs/comparers';

const array = [3, 1, 2];
array.sort(compareNumberAsc());
console.log(array);
// [1, 2, 3]
```

## API Listing

### Number

- [`compareNumberAsc`](#comparenumberasc) - Creates a comparison function which can be used to sort a number array in ascending order.
- [`compareNumberDesc`](#comparenumberdesc) - Creates a comparison function which can be used to sort a number array in descending order.
- [`compareByNumberAsc`](#comparebynumberasc) - Creates a comparison function which can be used to sort an array of items of arbitrary type, by first applying a `mapper` function returning a number, then sorting by the number in ascending order.
- [`compareByNumberDesc`](#comparebynumberdesc) - Creates a comparison function which can be used to sort an array of items of arbitrary type, by first applying a `mapper` function returning a number, then sorting by the number in descending order.

### String

- [`compareStringAsc`](#comparestringasc) - Creates a comparison function which can be used to sort a string array in ascending order.
- [`compareStringDesc`](#comparestringdesc) - Creates a comparison function which can be used to sort a string array in descending order.
- [`compareByStringAsc`](#comparebystringasc) - Creates a comparison function which can be used to sort an array of items of arbitrary type, by first applying a `mapper` function returning a string, then sorting by the string in ascending order.
- [`compareByStringDesc`](#comparebystringdesc) - Creates a comparison function which can be used to sort an array of items of arbitrary type, by first applying a `mapper` function returning a string, then sorting by the string in descending order.

## API

### Number

#### `compareNumberAsc`

Creates a comparison function which can be used to sort a number array in ascending order.

```ts
import { compareNumberAsc } from '@gmjs/comparers';

const array = [3, 1, 2];
array.sort(compareNumberAsc());
console.log(array);
// [1, 2, 3]
```

#### `compareNumberDesc`

Creates a comparison function which can be used to sort a number array in descending order.

```ts
import { compareNumberDesc } from '@gmjs/comparers';

const array = [3, 1, 2];
array.sort(compareNumberDesc());
console.log(array);
// [3, 2, 1]
```

#### `compareByNumberAsc`

Creates a comparison function which can be used to sort an array of items of arbitrary type.

The sort is done by applying a `mapper` function (first parameter) which returns a number. The comparison is done based on the number returned by the `mapper` function, in ascending order.

```ts
import { compareByNumberAsc } from '@gmjs/comparers';

const array = [{ value: 3 }, { value: 1 }, { value: 2 }];
array.sort(compareByNumberAsc((item) => item.value));
console.log(array);
// [{ value: 1 }, { value: 2 }, { value: 3 }]
```

#### `compareByNumberDesc`

Creates a comparison function which can be used to sort an array of items of arbitrary type.

The sort is done by applying a `mapper` function (first parameter) which returns a number. The comparison is done based on the number returned by the `mapper` function, in descending order.

```ts
import { compareByNumberDesc } from '@gmjs/comparers';

const array = [{ value: 3 }, { value: 1 }, { value: 2 }];
array.sort(compareByNumberDesc((item) => item.value));
console.log(array);
// [{ value: 3 }, { value: 2 }, { value: 1 }]
```

### String

#### `compareStringAsc`

Creates a comparison function which can be used to sort a string array in ascending order.

Accepts an optional `options` parameter of type [`CompareStringOptions`](#comparestringoptions).

```ts
import { compareStringAsc } from '@gmjs/comparers';

const array = ['c', 'a', 'b'];
array.sort(compareStringAsc());
console.log(array);
// ['a', 'b', 'c']
```

#### `compareStringDesc`

Creates a comparison function which can be used to sort a string array in descending order.

Accepts an optional `options` parameter of type [`CompareStringOptions`](#comparestringoptions).

```ts
import { compareStringDesc } from '@gmjs/comparers';

const array = ['c', 'a', 'b'];
array.sort(compareStringDesc());
console.log(array);
// ['c', 'b', 'a']
```

#### `compareByStringAsc`

Creates a comparison function which can be used to sort an array of items of arbitrary type.

The sort is done by applying a `mapper` function (first parameter) which returns a string. The comparison is done based on the string returned by the `mapper` function, in ascending order.

Accepts an optional `options` parameter of type [`CompareStringOptions`](#comparestringoptions).

```ts
import { compareByStringAsc } from '@gmjs/comparers';

const array = [{ value: 'c' }, { value: 'a' }, { value: 'b' }];
array.sort(compareByStringAsc((item) => item.value));
console.log(array);
// [{ value: 'a' }, { value: 'b' }, { value: 'c' }]
```

#### `compareByStringDesc`

Creates a comparison function which can be used to sort an array of items of arbitrary type.

The sort is done by applying a `mapper` function (first parameter) which returns a string. The comparison is done based on the string returned by the `mapper` function, in descending order.

Accepts an optional `options` parameter of type [`CompareStringOptions`](#comparestringoptions).

```ts
import { compareByStringDesc } from '@gmjs/comparers';

const array = [{ value: 'c' }, { value: 'a' }, { value: 'b' }];
array.sort(compareByStringDesc((item) => item.value));
console.log(array);
// [{ value: 'c' }, { value: 'b' }, { value: 'a' }]
```

## Types

#### `CompareStringOptions`

If unspecified, the default are as follows:

- `locale`: `'en'`
- `sensitivity`: `'case'`
- `caseFirst`: `'upper'`

For description of options, check out:

- [`locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#locales)
- [`sensitivity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity)
- [`caseFirst`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#caseFirst)

```ts
type CompareStringSensivity = 'base' | 'accent' | 'case' | 'variant';
type CompareStringCaseFirst = 'upper' | 'lower' | 'none';

interface CompareStringOptions {
  readonly locale?: string;
  readonly sensitivity?: CompareStringSensivity;
  readonly caseFirst?: CompareStringCaseFirst;
}
```

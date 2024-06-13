import { describe, expect, it } from '@jest/globals';
import {
  CompareStringOptions,
  compareByStringAsc,
  compareByStringDesc,
  compareStringAsc,
  compareStringDesc,
} from './compare-string';
import { CompareFn } from '../types';

describe('compare-string', () => {
  describe('compareStringAsc()', () => {
    const EXAMPLES: readonly CompareExample<string>[] = [
      {
        input: {
          item1: '',
          item2: '',
          options: undefined,
        },
        expected: 0,
      },
      {
        input: {
          item1: '',
          item2: 'a',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'a',
          item2: '',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'a',
          item2: 'b',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'b',
          item2: 'a',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: ' b',
          item2: 'a',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'aa',
          item2: 'ab',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'variant',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'variant',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            caseFirst: 'lower',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            caseFirst: 'none',
          },
        },
        expected: 1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareStringAsc(example.input.options));
    }
  });

  describe('compareStringDesc()', () => {
    const EXAMPLES: readonly CompareExample<string>[] = [
      {
        input: {
          item1: '',
          item2: '',
          options: undefined,
        },
        expected: 0,
      },
      {
        input: {
          item1: '',
          item2: 'a',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'a',
          item2: '',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'a',
          item2: 'b',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'b',
          item2: 'a',
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: ' b',
          item2: 'a',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'aa',
          item2: 'ab',
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'accent',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            sensitivity: 'variant',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: 'á',
          item2: 'a',
          options: {
            sensitivity: 'variant',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            caseFirst: 'lower',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: 'A',
          item2: 'a',
          options: {
            caseFirst: 'none',
          },
        },
        expected: -1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareStringDesc(example.input.options));
    }
  });

  describe('compareByStringAsc()', () => {
    interface Item {
      readonly value: string;
    }

    const MAPPER = (item: Item): string => item.value;

    const EXAMPLES: readonly CompareExample<Item>[] = [
      {
        input: {
          item1: { value: '' },
          item2: { value: '' },
          options: undefined,
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: '' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'a' },
          item2: { value: '' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'a' },
          item2: { value: 'b' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'b' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: ' b' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'aa' },
          item2: { value: 'ab' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'variant',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'variant',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            caseFirst: 'lower',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            caseFirst: 'none',
          },
        },
        expected: 1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareByStringAsc(MAPPER, example.input.options));
    }
  });

  describe('compareByStringDesc()', () => {
    interface Item {
      readonly value: string;
    }

    const MAPPER = (item: Item): string => item.value;

    const EXAMPLES: readonly CompareExample<Item>[] = [
      {
        input: {
          item1: { value: '' },
          item2: { value: '' },
          options: undefined,
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: '' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'a' },
          item2: { value: '' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'a' },
          item2: { value: 'b' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'b' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: ' b' },
          item2: { value: 'a' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'aa' },
          item2: { value: 'ab' },
          options: undefined,
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'base',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'accent',
          },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'accent',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'variant',
          },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 'á' },
          item2: { value: 'a' },
          options: {
            sensitivity: 'variant',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            caseFirst: 'lower',
          },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 'A' },
          item2: { value: 'a' },
          options: {
            caseFirst: 'none',
          },
        },
        expected: -1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(
        example,
        compareByStringDesc(MAPPER, example.input.options),
      );
    }
  });
});

interface CompareExample<T> {
  readonly input: {
    readonly item1: T;
    readonly item2: T;
    readonly options: CompareStringOptions | undefined;
  };
  readonly expected: number;
}

function doCompareTest<T>(
  example: CompareExample<T>,
  compareFn: CompareFn<T>,
): void {
  it(JSON.stringify(example), () => {
    const actual = compareFn(example.input.item1, example.input.item2);
    expect(actual).toEqual(example.expected);
  });
}

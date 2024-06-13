import { describe, expect, it } from '@jest/globals';
import {
  compareByNumberAsc,
  compareByNumberDesc,
  compareNumberAsc,
  compareNumberDesc,
} from './compare-number';
import { CompareFn } from '../types';

describe('compare-number', () => {
  describe('compareNumberAsc()', () => {
    const EXAMPLES: readonly CompareExample<number>[] = [
      {
        input: {
          item1: 0,
          item2: 0,
        },
        expected: 0,
      },
      {
        input: {
          item1: 1,
          item2: 1,
        },
        expected: 0,
      },
      {
        input: {
          item1: 1,
          item2: 2,
        },
        expected: -1,
      },
      {
        input: {
          item1: 2,
          item2: 1,
        },
        expected: 1,
      },
      {
        input: {
          item1: -1,
          item2: 0,
        },
        expected: -1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareNumberAsc());
    }
  });

  describe('compareNumberDesc()', () => {
    const EXAMPLES: readonly CompareExample<number>[] = [
      {
        input: {
          item1: 0,
          item2: 0,
        },
        expected: 0,
      },
      {
        input: {
          item1: 1,
          item2: 1,
        },
        expected: 0,
      },
      {
        input: {
          item1: 1,
          item2: 2,
        },
        expected: 1,
      },
      {
        input: {
          item1: 2,
          item2: 1,
        },
        expected: -1,
      },
      {
        input: {
          item1: -1,
          item2: 0,
        },
        expected: 1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareNumberDesc());
    }
  });

  describe('compareByNumberAsc()', () => {
    interface Item {
      readonly value: number;
    }

    const MAPPER = (item: Item): number => item.value;

    const EXAMPLES: readonly CompareExample<Item>[] = [
      {
        input: {
          item1: { value: 0 },
          item2: { value: 0 },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 1 },
          item2: { value: 1 },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 1 },
          item2: { value: 2 },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: 2 },
          item2: { value: 1 },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: -1 },
          item2: { value: 0 },
        },
        expected: -1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareByNumberAsc(MAPPER));
    }
  });

  describe('compareByNumberDesc()', () => {
    interface Item {
      readonly value: number;
    }

    const MAPPER = (item: Item): number => item.value;

    const EXAMPLES: readonly CompareExample<Item>[] = [
      {
        input: {
          item1: { value: 0 },
          item2: { value: 0 },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 1 },
          item2: { value: 1 },
        },
        expected: 0,
      },
      {
        input: {
          item1: { value: 1 },
          item2: { value: 2 },
        },
        expected: 1,
      },
      {
        input: {
          item1: { value: 2 },
          item2: { value: 1 },
        },
        expected: -1,
      },
      {
        input: {
          item1: { value: -1 },
          item2: { value: 0 },
        },
        expected: 1,
      },
    ];

    for (const example of EXAMPLES) {
      doCompareTest(example, compareByNumberDesc(MAPPER));
    }
  });
});

interface CompareExample<T> {
  readonly input: {
    readonly item1: T;
    readonly item2: T;
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

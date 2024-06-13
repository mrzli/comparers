import { expect, it } from '@jest/globals';
import { CompareFn } from '../../types';

export interface CompareExample<T> {
  readonly input: {
    readonly item1: T;
    readonly item2: T;
  };
  readonly expected: number;
}

export function doCompareTest<T>(
  example: CompareExample<T>,
  compareFn: CompareFn<T>,
): void {
  it(JSON.stringify(example), () => {
    const actual = compareFn(example.input.item1, example.input.item2);
    expect(actual).toEqual(example.expected);
  });
}

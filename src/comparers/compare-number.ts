import { CompareFn } from '../types';
import { sign } from './util';

export function compareNumberAsc(): CompareFn<number> {
  return (item1: number, item2: number): number => sign(item1 - item2);
}

export function compareNumberDesc(): CompareFn<number> {
  return (item1: number, item2: number): number => sign(item2 - item1);
}

export function compareByNumberAsc<T>(
  mapper: (item: T) => number,
): CompareFn<T> {
  return (item1: T, item2: T): number => sign(mapper(item1) - mapper(item2));
}

export function compareByNumberDesc<T>(
  mapper: (item: T) => number,
): CompareFn<T> {
  return (item1: T, item2: T): number => sign(mapper(item2) - mapper(item1));
}

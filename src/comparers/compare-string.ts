import { CompareFn } from '../types';
import { sign } from './util';

export type CompareStringSensivity = 'base' | 'accent' | 'case' | 'variant';
export type CompareStringCaseFirst = 'upper' | 'lower' | 'none';

export interface CompareStringOptions {
  readonly locale?: string;
  readonly sensitivity?: CompareStringSensivity;
  readonly caseFirst?: CompareStringCaseFirst;
}

export function compareStringAsc(
  options?: CompareStringOptions,
): CompareFn<string> {
  const { finalOptions, collatorOptions } = toCombinedOptions(options);
  return (item1: string, item2: string): number => {
    const diff = item1.localeCompare(
      item2,
      finalOptions.locale,
      collatorOptions,
    );
    return sign(diff);
  };
}

export function compareStringDesc(
  options?: CompareStringOptions,
): CompareFn<string> {
  const { finalOptions, collatorOptions } = toCombinedOptions(options);
  return (item1: string, item2: string): number => {
    const diff = item2.localeCompare(
      item1,
      finalOptions.locale,
      collatorOptions,
    );
    return sign(diff);
  };
}

export function compareByStringAsc<T>(
  mapper: (item: T) => string,
  options?: CompareStringOptions,
): CompareFn<T> {
  const { finalOptions, collatorOptions } = toCombinedOptions(options);
  return (item1: T, item2: T): number => {
    const diff = mapper(item1).localeCompare(
      mapper(item2),
      finalOptions.locale,
      collatorOptions,
    );
    return sign(diff);
  };
}

export function compareByStringDesc<T>(
  mapper: (item: T) => string,
  options?: CompareStringOptions,
): CompareFn<T> {
  const { finalOptions, collatorOptions } = toCombinedOptions(options);
  return (item1: T, item2: T): number => {
    const diff = mapper(item2).localeCompare(
      mapper(item1),
      finalOptions.locale,
      collatorOptions,
    );
    return sign(diff);
  };
}

function toCombinedOptions(
  options: CompareStringOptions | undefined,
): ProcessedOptions {
  const finalOptions = toFinalOptions(options);
  const collatorOptions = toCollatorOptions(finalOptions);
  return {
    finalOptions,
    collatorOptions,
  };
}

function toFinalOptions(
  options: CompareStringOptions | undefined,
): Required<CompareStringOptions> {
  if (!options) {
    return DEFAULT_OPTIONS;
  }

  const { locale, sensitivity, caseFirst } = options;

  return {
    locale: locale ?? DEFAULT_OPTIONS.locale,
    sensitivity: sensitivity ?? DEFAULT_OPTIONS.sensitivity,
    caseFirst: caseFirst ?? DEFAULT_OPTIONS.caseFirst,
  };
}

function toCollatorOptions(
  options: Required<CompareStringOptions>,
): Intl.CollatorOptions {
  const { sensitivity, caseFirst } = options;
  return {
    sensitivity,
    caseFirst: caseFirst === 'none' ? undefined : caseFirst,
  };
}

const DEFAULT_OPTIONS: Required<CompareStringOptions> = {
  locale: 'en',
  sensitivity: 'case',
  caseFirst: 'upper',
};

interface ProcessedOptions {
  readonly finalOptions: Required<CompareStringOptions>;
  readonly collatorOptions: Intl.CollatorOptions;
}

import type { PropertyOptions } from '@vnodes/prop';
import { coerce } from './coerce.js';

export function extractDecorators(doc: string): PropertyOptions {
  const options = [...doc.matchAll(/@(\w+)\((\w+)?\)/g)].reduce(
    (acc: Record<string, any>, value) => {
      acc[value[1]] = coerce(value[2]);
      return acc;
    },
    {} as PropertyOptions,
  );
  return options;
}

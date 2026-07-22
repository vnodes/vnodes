import type { PropertyOptions } from '@vnodes/prop';
import { coerce } from './coerce.js';

export function extractDecorators(doc: string): PropertyOptions {
  const options = doc
    .split(/\s+(?=@)/)
    .map((e) => {
      return [...e.matchAll(/@(\w+)\((.{0,})\)/g)].reduce((acc: Record<string, any>, value) => {
        if (value[2].trim() === '') {
          value[2] = 'true';
        }

        acc[value[1]] = coerce(value[2]);
        return acc;
      }, {} as PropertyOptions);
    })
    .reduce((acc, value) => {
      acc = { ...acc, ...value };
      return acc;
    }, {});

  return options;
}

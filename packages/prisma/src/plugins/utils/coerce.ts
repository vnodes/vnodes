import type { Any } from '@vnodes/types';

export function toArrayString(arr: Array<Any>) {
  const items = arr
    .map((e) => {
      if (typeof e === 'string') {
        return `'${e}'`;
      }
      return e;
    })
    .join(',');
  return `[ ${items}]`;
}

export function isArrayStructure(stringValue: string) {
  return /^\[.{0,}\]$/.test(stringValue);
}

export function isObjectStructure(stringValue: string) {
  return /^\{.{0,}\}$/.test(stringValue);
}

export function coerce(value: Any): Any {
  if (typeof value === 'string') {
    const stringValue = value.replace(/\s{1,}/g, ' ').trim();

    if (isArrayStructure(stringValue)) {
      return stringValue.replace(/\[|\]/g, '').split(',').map(coerce);
    }

    if (isObjectStructure(stringValue)) {
      return stringValue
        .replace(/\{|\}/g, '')
        .split(',')
        .reduce((acc: Any, v) => {
          const [key, value] = v.split(':');
          acc[key] = coerce(value);
          return acc;
        }, {});
    }

    try {
      return JSON.parse(stringValue);
    } catch {
      return stringValue;
    }
  }

  return value;
}

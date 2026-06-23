import type { Any } from '@vnodes/types';

export function coerce(value: Any) {
  if (typeof value === 'string') {
    value = value.replace(/\s{1,}/g, ' ').trim();

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

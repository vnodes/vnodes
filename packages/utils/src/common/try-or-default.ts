import { type Optional } from '@vnodes/types';

export function tryOrDefault<T>(
  handler: () => T,
  defaultValue?: T,
): Optional<T> {
  try {
    return handler();
  } catch {
    return defaultValue;
  }
}

import { type Optional } from '@vnodes/types';

export function isDefined<T, Callback extends (value: T) => void>(
  value: Optional<T>,
  ...callbacks: Callback[]
): value is T {
  if (value !== null && value !== undefined) {
    if (callbacks?.length) {
      callbacks.forEach((c) => c(value));
    }
    return true;
  }
  return false;
}

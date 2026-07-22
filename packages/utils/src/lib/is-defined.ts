import type { Some } from '@vnodes/types';

export function isDefined<T>(value: Some<T>, ...handlers: CallableFunction[]): value is T {
  const __isDefined = value !== undefined && value !== null;

  if (__isDefined) {
    handlers.forEach((handler) => handler(value));
  }
  return __isDefined;
}

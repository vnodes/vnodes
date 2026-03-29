import type { Some } from '@vnodes/types';
import { isDefined } from './is-defined.js';

export function isUndefined<T>(value: Some<T>): value is null | undefined {
    return !isDefined(value);
}

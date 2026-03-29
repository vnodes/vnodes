import type { Some } from '@vnodes/types';
import { isDefined } from './is-defined.js';

export function defined<T>(value: Some<T>, thenValue: (value: T) => T, elseValue: () => T): T {
    if (isDefined(value)) {
        return thenValue(value);
    }
    return elseValue();
}

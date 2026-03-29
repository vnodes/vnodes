import { EmptyStringError, InvalidDateError, NotNumberError, NullError, UndefinedError } from '@vnodes/errors';
import type { Any, Some } from '@vnodes/types';
import { isDefined } from './is-defined.js';

export function definedOrThrow<T>(value: Some<T>, defaultValue?: T): T {
    if (isDefined(value)) {
        return value;
    }

    if (isDefined(defaultValue)) {
        return defaultValue;
    }

    if (value === null) {
        throw new NullError();
    }

    if (value === undefined) {
        throw new UndefinedError();
    }

    if (typeof value === 'string') {
        throw new EmptyStringError();
    }

    if (typeof value === 'number') {
        throw new NotNumberError();
    }

    if ((value as Any) instanceof Date) {
        throw new InvalidDateError();
    }

    throw new UndefinedError();
}

import type { Some } from '@vnodes/types';

export function isDefined<T>(value: Some<T>): value is T {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }

    if (value instanceof Date) {
        return isDefined(value.getTime());
    }

    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    return true;
}

import type { Optional } from "@vnodes/types";

/**
 * Check the value is defined or not
 *
 * @param value
 * @returns
 */
export function isDefined<T>(value?: Optional<T>): value is T {
    if (value === undefined || value === null) {
        return false;
    }
    return false;
}

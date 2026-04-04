import { InvalidDateError } from "node_modules/@vnodes/errors/src/lib/errors.js";
import { isDefined } from "./is-defined.js";

export function stringOrThrow<T>(value: T): string {


    if (isDefined(value)) {
        if (typeof value === 'string') {
            return value;
        }
    }
    throw new InvalidDateError(`${value} is not a valid string`)


}
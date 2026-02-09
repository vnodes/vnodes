import type { Optional } from "@vnodes/types";
import { isDefined } from "./is-defined.js";

export function isNotDefined<T>(value?: Optional<T>): value is null | undefined {
    return !isDefined(value);
}

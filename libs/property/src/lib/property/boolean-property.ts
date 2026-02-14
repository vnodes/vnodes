import type { ReferPropertyOptions } from "@vnodes/types";
import { IsBoolean, type ValidationOptions } from "class-validator";

export function BooleanProperty(
    _options: ReferPropertyOptions<"boolean">,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        IsBoolean(validationOptions)(...args);
    };
}

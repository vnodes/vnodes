import type { ReferPropertyOptions } from "@vnodes/types";
import { Type } from "class-transformer";
import { ValidateNested, type ValidationOptions } from "class-validator";

export function ObjectProperty(
    options: ReferPropertyOptions<"object">,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { target } = options;
        Type(() => target)(...args);
        ValidateNested(validationOptions)(...args);
    };
}

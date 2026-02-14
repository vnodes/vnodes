import type { PropertyOptions } from "@vnodes/types";
import { IsDefined, IsNotEmpty, IsOptional, type ValidationOptions } from "class-validator";

export function CommonProperty(options: PropertyOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        const { required } = options;

        if (required === true) {
            IsDefined(validationOptions)(...args);
            IsNotEmpty(validationOptions)(...args);
        } else {
            IsOptional(validationOptions)(...args);
        }
    };
}

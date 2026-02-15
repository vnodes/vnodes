import type { ReferPropertyOptions } from '@vnodes/types';
import { Type } from 'class-transformer';
import { IsJSON, ValidateNested, type ValidationOptions } from 'class-validator';

export function JsonProperty(
    options: ReferPropertyOptions<'json'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { target } = options;

        if (target) {
            Type(() => target)(...args);
            ValidateNested(validationOptions)(...args);
        } else {
            IsJSON(validationOptions)(...args);
        }
    };
}

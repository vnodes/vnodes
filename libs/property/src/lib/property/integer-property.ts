import type { ReferPropertyOptions } from '@vnodes/types';
import { IsInt, Max, Min, type ValidationOptions } from 'class-validator';

export function IntegerProperty(
    options: ReferPropertyOptions<'integer'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { min, max } = options;

        IsInt(validationOptions)(...args);

        if (min) Min(min, validationOptions)(...args);
        if (max) Max(max, validationOptions)(...args);
    };
}

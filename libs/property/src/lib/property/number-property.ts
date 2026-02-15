import type { ReferPropertyOptions } from '@vnodes/types';
import { IsNumber, Max, Min, type ValidationOptions } from 'class-validator';
export function NumberProperty(
    options: ReferPropertyOptions<'number'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { min, max } = options;

        IsNumber({}, validationOptions)(...args);

        if (min) Min(min, validationOptions)(...args);
        if (max) Max(max, validationOptions)(...args);
    };
}

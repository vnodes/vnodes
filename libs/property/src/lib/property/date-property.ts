import type { ReferPropertyOptions } from '@vnodes/types';
import { IsDate, type ValidationOptions } from 'class-validator';

export function DateProperty(
    _options: ReferPropertyOptions<'date'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        IsDate(validationOptions)(...args);
    };
}

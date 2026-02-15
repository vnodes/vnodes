import type { ReferPropertyOptions } from '@vnodes/types';
import { ArrayMaxSize, ArrayMinSize, IsArray, type ValidationOptions } from 'class-validator';

export function ArrayProperty(
    options: ReferPropertyOptions<'array'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { minArrayLength, maxArrayLength } = options;

        IsArray()(...args);

        if (minArrayLength) ArrayMinSize(minArrayLength, validationOptions)(...args);
        if (maxArrayLength) ArrayMaxSize(maxArrayLength, validationOptions)(...args);
    };
}

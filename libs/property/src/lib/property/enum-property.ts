import type { ReferPropertyOptions } from '@vnodes/types';
import { IsEnum, type ValidationOptions } from 'class-validator';

export function EnumProperty(
    options: ReferPropertyOptions<'enum'>,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (...args) => {
        const { enum: enumDef } = options;

        IsEnum(enumDef, validationOptions)(...args);
    };
}

import type { DMMF } from '@prisma/generator-helper';
import { createDtoFieldType } from './create-dto-field-type.js';
import { printInputDtoFieldDecorator } from './print-input-dto-field-decorator.js';

export function printUpdateDtoField(_model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string): string {
    return [
        printInputDtoFieldDecorator(_model, { ...field, isRequired: false }, propertyDecoratorName),
        `${field.name}? : ${createDtoFieldType(field)}`,
    ].join('\n');
}

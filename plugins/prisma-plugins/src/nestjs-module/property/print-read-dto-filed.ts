import type { DMMF } from '@prisma/generator-helper';
import { createDtoFieldType } from './create-dto-field-type.js';
import { printReadDtoFieldDecorator } from './print-read-dto-field-decorator.js';

export function printReadDtoField(model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string): string {
    return [
        printReadDtoFieldDecorator(model, field, propertyDecoratorName),
        `${field.name}?: ${createDtoFieldType(model, field)}`,
    ].join(' ');
}

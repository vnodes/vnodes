import type { DMMF } from '@prisma/generator-helper';
import { printReadDtoFieldDecorator } from './print-read-dto-field-decorator.js';
import { readDtoFieldType } from './read-dto-field-type.js';

export function printReadDtoField(model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string): string {
    return [
        printReadDtoFieldDecorator(model, field, propertyDecoratorName),
        `${field.name}?: ${readDtoFieldType(model, field)}`,
    ].join(' ');
}

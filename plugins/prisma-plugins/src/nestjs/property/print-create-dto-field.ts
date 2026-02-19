import type { DMMF } from '@prisma/generator-helper';
import { isRequiredField } from '@vnodes/prisma-helper';
import { createDtoFieldType } from './create-dto-field-type.js';
import { printInputDtoFieldDecorator } from './print-input-dto-field-decorator.js';

export function printCreateDtoField(_model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string): string {
    const isRequried = isRequiredField(field);
    const optionalMark = isRequried ? '' : '?';

    return [
        printInputDtoFieldDecorator(_model, field, propertyDecoratorName),
        `${field.name}${optionalMark}: ${createDtoFieldType(field)}`,
    ].join(' ');
}

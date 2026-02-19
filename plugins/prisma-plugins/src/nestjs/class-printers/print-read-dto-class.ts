import type { DMMF } from '@prisma/generator-helper';
import { isReadField } from '@vnodes/prisma-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';
import { printClass } from '../class/print-class.js';
import { printCreateDtoField } from '../property/print-create-dto-field.js';

export function printReadDtoClass(model: DMMF.Model, propertyDecoratorName: string) {
    return printClass(
        model,
        isReadField,
        (model) => `${model.name}${ClassNameSuffix.ReadDto}`,
        printCreateDtoField,
        propertyDecoratorName,
    );
}

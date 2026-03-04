import type { DMMF } from '@prisma/generator-helper';
import { isReadField } from '@vnodes/prisma-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';
import { printClass } from '../class/print-class.js';
import { printReadDtoField } from '../property/print-read-dto-filed.js';

export function printReadDtoClass(model: DMMF.Model, propertyDecoratorName: string) {
    return printClass(
        model,
        isReadField,
        (model) => `${model.name}${ClassNameSuffix.ReadDto}`,
        printReadDtoField,
        propertyDecoratorName,
    );
}

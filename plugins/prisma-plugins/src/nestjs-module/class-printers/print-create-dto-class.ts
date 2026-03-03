import type { DMMF } from '@prisma/generator-helper';
import { isCreateInputField } from '@vnodes/prisma-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';
import { printClass } from '../class/print-class.js';
import { printCreateDtoField } from '../property/print-create-dto-field.js';

export function printCreateDtoClass(model: DMMF.Model, propertyDecoratorName: string) {
    return printClass(
        model,
        isCreateInputField,
        (model) => `${model.name}${ClassNameSuffix.CreateDto}`,
        printCreateDtoField,
        propertyDecoratorName,
    );
}

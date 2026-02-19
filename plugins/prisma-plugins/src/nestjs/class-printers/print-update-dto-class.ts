import type { DMMF } from '@prisma/generator-helper';
import { isUpdateInputField } from '@vnodes/prisma-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';
import { printClass } from '../class/print-class.js';
import { printUpdateDtoField } from '../property/print-update-dto-field.js';

export function printUpdateDtoClass(model: DMMF.Model, propertyDecoratorName: string) {
    return printClass(
        model,
        isUpdateInputField,
        (model) => `${model.name}${ClassNameSuffix.UpdateDTo}`,
        printUpdateDtoField,
        propertyDecoratorName,
    );
}

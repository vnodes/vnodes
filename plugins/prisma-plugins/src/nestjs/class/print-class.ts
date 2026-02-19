import type { DMMF } from '@prisma/generator-helper';
import { classDecleration } from './class-decleration.js';

export function printClass(
    model: DMMF.Model,
    fieldFilterFn: (field: DMMF.Field) => boolean,
    classNameFn: (model: DMMF.Model) => string,
    classFieldFn: (model: DMMF.Model, field: DMMF.Field, propertyDecoratorName: string) => string,
    propertyDecoratorName: string,
) {
    const fields = model.fields
        .filter(fieldFilterFn)
        .map((field) => classFieldFn(model, field, propertyDecoratorName))
        .join(';\n');

    return [classDecleration(model, classNameFn), '{', fields, '}'].join('\n');
}

import type { DMMF } from '@prisma/generator-helper';

export function printDtoClass(
    model: DMMF.Model,
    fieldPrinterFn: (field: DMMF.Field) => string,
    classNameSuffix: 'CreateDto' | 'UpdateDto',
) {
    const fields = model.fields
        .map(fieldPrinterFn)
        .filter((e) => e)
        .join('\n\t');
    return [`export class ${model.name}${classNameSuffix} {`, fields, '}'].join('\n');
}

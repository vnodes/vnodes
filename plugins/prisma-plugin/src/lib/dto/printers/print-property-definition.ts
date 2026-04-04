import type { DMMF } from '@prisma/generator-helper';
import { fieldType, isRequiredField, ParsedPropOptions } from '@vnodes/prisma-plugin-helpers';

export function printPropertyDefinition(field: DMMF.Field, parsedPropOptions: ParsedPropOptions) {
    const requiredMark = isRequiredField(field, parsedPropOptions) ? '' : '?';
    return `${field.name}${requiredMark}:${fieldType(field)}`;
}

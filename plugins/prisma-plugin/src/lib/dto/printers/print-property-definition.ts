import type { DMMF } from '@prisma/generator-helper';
import { fieldType, isRequiredField, ParsedPropOptions } from '@vnodes/prisma-plugin-helpers';

export function printPropertyDefinition(field: DMMF.Field, parsedAnnotations: ParsedPropOptions) {
    const requiredMark = isRequiredField(field, parsedAnnotations) ? '' : '?';
    return `${field.name}${requiredMark}:${fieldType(field)}`;
}

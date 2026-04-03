import type { DMMF } from '@prisma/generator-helper';

export function printPropertyDefinition(field: DMMF.Field) {
    return `${field.name}:${field.type}`;
}

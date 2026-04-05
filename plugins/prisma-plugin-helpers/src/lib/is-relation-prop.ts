import type { DMMF } from '@prisma/generator-helper';

export function isRelationProp(field: DMMF.Field) {
    return field.kind === 'object';
}

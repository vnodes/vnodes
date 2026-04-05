import type { DMMF } from '@prisma/generator-helper';

export function isSoftDeleteProp(field: DMMF.Field) {
    return /^deletedAt$/i.test(field.name) && field.type === 'DateTime';
}

import type { DMMF } from '@prisma/generator-helper';

export function isSearchableField(field: DMMF.Field): boolean {
    if (field.name === 'uuid' || field.name === 'id') {
        return false;
    }

    if (field.type === 'String') {
        return true;
    }

    return false;
}

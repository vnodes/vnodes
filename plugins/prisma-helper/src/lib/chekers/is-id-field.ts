import type { DMMF } from '@prisma/generator-helper';

export function isIdField(field: DMMF.Field) {
    if (field.isId) {
        return true;
    }

    if (field.name === 'uuid') {
        return true;
    }

    return false;
}

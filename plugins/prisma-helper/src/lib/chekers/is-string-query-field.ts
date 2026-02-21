import type { DMMF } from '@prisma/generator-helper';

export function isStringQueryField(field: DMMF.Field) {
    if (field.type === 'String') {
        return true;
    }

    return false;
}

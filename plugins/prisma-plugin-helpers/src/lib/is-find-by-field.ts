import type { DMMF } from '@prisma/generator-helper';

export function isFindByField(field: DMMF.Field) {
    if (field.kind === 'scalar') {
        if (field.type === 'DateTime') {
            return false;
        }
        return true;
    }
    return false;
}

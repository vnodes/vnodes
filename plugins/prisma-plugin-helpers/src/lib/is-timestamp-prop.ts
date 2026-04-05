import type { DMMF } from '@prisma/generator-helper';

export function isTimestampProp(field: DMMF.Field) {
    if (field.kind === 'scalar') {
        if (field.type === 'DateTime') {
            return /^createdat|updatedat|deletedat$/i.test(field.name);
        }
    }
    return false;
}

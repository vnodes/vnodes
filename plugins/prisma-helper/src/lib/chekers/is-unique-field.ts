import type { DMMF } from '@prisma/generator-helper';

export function isUnqiueField(field: DMMF.Field) {
    return field.isUnique || field.isId;
}

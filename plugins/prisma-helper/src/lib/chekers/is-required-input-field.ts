import type { DMMF } from '@prisma/generator-helper';

export function isRequiredField(field: DMMF.Field) {
    if (field.isList) {
        return false;
    }

    if (field.isRequired) {
        if ((field.default as DMMF.FieldDefault)?.name) {
            return false;
        }

        return true;
    }

    return false;
}

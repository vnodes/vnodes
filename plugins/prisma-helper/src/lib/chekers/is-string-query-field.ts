import type { DMMF } from '@prisma/generator-helper';
import type { ScalarType } from '../types/scalar-type.js';

export function isStringQueryField(field: DMMF.Field) {
    if (field.nativeType) {
        return false;
    }

    if (field.kind === 'scalar') {
        if ((field.type as ScalarType) === 'String') {
            if (field.nativeType?.[0] === 'Uuid') return false;
        }
    }
    return false;
}

import type { DMMF } from '@prisma/generator-helper';
import type { ScalarType } from '../types/scalar-type.js';

export function isStringField(field: DMMF.Field) {
    switch (field.kind) {
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'String': {
                    return true;
                }
            }
            break;
        }
    }
    return false;
}

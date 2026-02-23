import type { DMMF } from '@prisma/generator-helper';
import type { ScalarType } from '../types/scalar-type.js';

export function isNumberField(field: DMMF.Field) {
    switch (field.kind) {
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'Decimal':
                case 'Float':
                case 'Int': {
                    return true;
                }
            }
            break;
        }
    }
    return false;
}

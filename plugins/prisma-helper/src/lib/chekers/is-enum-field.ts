import type { DMMF } from '@prisma/generator-helper';

export function isEnumField(field: DMMF.Field) {
    switch (field.kind) {
        case 'enum': {
            return true;
        }
    }
    return false;
}

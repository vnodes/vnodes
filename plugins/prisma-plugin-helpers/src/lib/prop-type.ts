import type { DMMF } from '@prisma/generator-helper';
import { UnsupportedError } from '@vnodes/errors';




export function __propType(field: DMMF.Field) {
    switch (field.kind) {
        case 'enum':
        case 'object': {
            return field.type;
        }
        case 'scalar': {
            switch (field.type) {
                case 'String': {
                    return 'string';
                }
                case 'Boolean': {
                    return 'boolean';
                }
                case 'BigInt': {
                    return 'BigInt';
                }
                case 'Decimal':
                case 'Int':
                case 'Float': {
                    return 'number';
                }
                case 'DateTime': {
                    return 'Date';
                }
                case 'Json': {
                    return 'any';
                }
                case 'Btypes': {
                    return 'Buffer';
                }
            }
            throw new UnsupportedError();
        }
        default:
            throw new UnsupportedError();
    }
}

export function propType(field: DMMF.Field) {
    return `${__propType(field)}${field.isList ? '[]' : ''}`;
}

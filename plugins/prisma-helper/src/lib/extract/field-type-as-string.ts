import type { DMMF } from '@prisma/generator-helper';

import type { ScalarType } from '../types/scalar-type.js';

export function fieldItemTypeAsString(field: DMMF.Field) {
    switch (field.kind) {
        case 'object': {
            return field.type;
        }
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'String': {
                    return 'string';
                }
                case 'Boolean': {
                    return 'boolean';
                }
                case 'Json': {
                    return 'Any';
                }
                case 'DateTime': {
                    return 'Date';
                }
                case 'Decimal':
                case 'Int':
                case 'Float': {
                    return 'number';
                }
                default: {
                    return 'Any';
                }
            }
        }
        case 'enum': {
            return `P.${field.type}`;
        }
        case 'unsupported': {
            return 'Any';
        }
    }
}
export function fieldTypeAsString(field: DMMF.Field) {
    const type = fieldItemTypeAsString(field);

    if (field.isList) {
        return `${type}[]`;
    }

    return type;
}

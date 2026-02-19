import type { DMMF } from '@prisma/generator-helper';
import type { ScalarType } from '../types/scalar-type.js';

export function fieldItemType(field: DMMF.Field) {
    switch (field.kind) {
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'String': {
                    return String;
                }
                case 'Boolean': {
                    return Boolean;
                }
                case 'Int':
                case 'Decimal':
                case 'Float': {
                    return Number;
                }
                case 'Json': {
                    return String;
                }
                case 'DateTime': {
                    return Date;
                }
                default: {
                    return field.type;
                }
            }
        }
        case 'object':
        case 'enum': {
            return field.type;
        }
        case 'unsupported': {
            throw new Error('Unsuppored kind');
        }
    }
}

/**
 * Get the field's typescript type class
 *
 * @param field
 * @returns
 */
export function fieldType(field: DMMF.Field) {
    const type = fieldItemType(field);

    if (field.isList) {
        return [type];
    }
    return type;
}

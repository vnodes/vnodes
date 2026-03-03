import type { DMMF } from '@prisma/generator-helper';
import type { ScalarType } from '@vnodes/prisma-helper';

export function __createDtoFieldType(_model: DMMF.Model, field: DMMF.Field) {
    switch (field.kind) {
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'Json':
                case 'String': {
                    return 'string';
                }
                case 'Boolean': {
                    return 'boolean';
                }
                case 'Decimal':
                case 'Int':
                case 'Float': {
                    return 'number';
                }

                case 'DateTime':
                    return 'Date';
                default:
                    throw new Error(`Unsupported scalar type: ${field.type}`);
            }
        }
        case 'enum':
            return `P.$Enums.${field.type}`;
        case 'unsupported':
        case 'object':
            throw new Error(`Unsupported type: ${field.kind}`);
    }
}

export function createDtoFieldType(model: DMMF.Model, field: DMMF.Field) {
    const type = __createDtoFieldType(model, field);

    if (field.isList) {
        return `${type}[]`;
    }
    return type;
}

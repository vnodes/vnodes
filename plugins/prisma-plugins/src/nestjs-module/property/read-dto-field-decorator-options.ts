import type { DMMF } from '@prisma/generator-helper';
import { ScalarType } from '@vnodes/prisma-helper';

export function __readDtoFieldDecoratorOptions(_model: DMMF.Model, field: DMMF.Field) {
    switch (field.kind) {
        case 'scalar': {
            switch (field.type as ScalarType) {
                case 'Json':
                case 'String': {
                    return 'String';
                }
                case 'Boolean': {
                    return 'Boolean';
                }
                case 'Decimal':
                case 'Float':
                case 'Int': {
                    return 'Number';
                }
                case 'DateTime': {
                    return 'Date';
                }
                default: {
                    throw new Error(`Unkown scalar type ${field.type}`);
                }
            }
        }
        case 'enum': {
            return 'String';
        }
        case 'object': {
            return `${field.type}Dtos.${field.type}ReadDto`;
        }
        case 'unsupported': {
            throw new Error('Unsupported');
        }
    }
}
export function readDtoFieldDecoratorOptions(_model: DMMF.Model, field: DMMF.Field) {
    const __decoratorOptionsType = __readDtoFieldDecoratorOptions(_model, field);

    const decoratorOptionsType = field.isList ? `[${__decoratorOptionsType}]` : __decoratorOptionsType;

    const options: string[] = [];

    if (field.isList || field.kind === 'object') {
        options.push(`type: ${decoratorOptionsType}`);
    }

    if (field.kind === 'enum') options.push(`enum: P.$Enums.${field.type}`);

    const optionsAsString = options.join(',').trim();

    if (optionsAsString) {
        return `{ ${optionsAsString} }`;
    }

    return '';
}

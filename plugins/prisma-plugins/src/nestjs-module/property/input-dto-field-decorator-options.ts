import type { DMMF } from '@prisma/generator-helper';
import { Annotations, type ScalarType } from '@vnodes/prisma-helper';

export function __inputDtoFieldDecoratorOptions(_model: DMMF.Model, field: DMMF.Field) {
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
        case 'object':
        case 'unsupported': {
            return 'any';
        }
    }
}

export function inputDtoFieldDecoratorOptions(_model: DMMF.Model, field: DMMF.Field) {
    const __decoratorOptionsType = __inputDtoFieldDecoratorOptions(_model, field);

    const decoratorOptionsType = field.isList ? `[${__decoratorOptionsType}]` : __decoratorOptionsType;

    const options: string[] = [];

    if (field.isList) {
        options.push(`type: ${decoratorOptionsType}`);
    }

    if (field.isRequired !== true) options.push('required: false');

    const _maximum = Annotations.max(field.documentation);
    const _minimum = Annotations.min(field.documentation);
    const _minLength = Annotations.minLength(field.documentation);
    const _maxLength = Annotations.maxLength(field.documentation);
    const _maxItems = Annotations.maxItems(field.documentation);
    const _minItems = Annotations.minItems(field.documentation);
    const _format = Annotations.format(field.documentation);
    const _description = Annotations.description(field.documentation);

    const maximum = _maximum?.[1];
    const minimum = _minimum?.[1];
    const minLength = _minLength?.[1];
    const maxLength = _maxLength?.[1];
    const maxItems = _maxItems?.[1];
    const minItems = _minItems?.[1];
    const format = _format?.[1];
    const description = _description?.[1];

    if (maximum !== undefined) options.push(`maximum: ${maximum}`);
    if (minimum !== undefined) options.push(`minimum: ${minimum}`);
    if (minLength !== undefined) options.push(`minLength: ${minLength}`);
    if (maxLength !== undefined) options.push(`maxLength: ${maxLength}`);
    if (maxItems !== undefined) options.push(`maxItems: ${maxItems}`);
    if (minItems !== undefined) options.push(`minItems: ${minItems}`);
    if (format !== undefined) options.push(`format: '${format}'`);
    if (description !== undefined) options.push(`description: '${description}'`);

    if (field.kind === 'enum') options.push(`enum: P.$Enums.${field.type}`);

    return `{ ${options.join(',')} }`;
}

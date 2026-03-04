import type { DMMF } from '@prisma/generator-helper';
import { __inputDtoFieldDecoratorOptions } from './input-dto-field-decorator-options.js';

export function readDtoFieldDecoratorOptions(_model: DMMF.Model, field: DMMF.Field) {
    const __decoratorOptionsType = __inputDtoFieldDecoratorOptions(_model, field);

    const decoratorOptionsType = field.isList ? `[${__decoratorOptionsType}]` : __decoratorOptionsType;

    const options: string[] = [];

    if (field.isList) {
        options.push(`type: ${decoratorOptionsType}`);
    }

    if (field.kind === 'enum') options.push(`enum: P.$Enums.${field.type}`);

    const optionsAsString = options.join(',').trim();

    if (optionsAsString) {
        return `{ ${optionsAsString} }`;
    }

    return '';
}

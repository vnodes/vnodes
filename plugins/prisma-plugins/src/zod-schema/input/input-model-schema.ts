import type { DMMF } from '@prisma/generator-helper';
import { hasGenerated } from '../helpers/has-key.js';
import type { SchemaNameHandler } from '../types/schema-name-handler.js';
import { inputFieldSchema } from './input-field-schema.js';

export function __inputFieldFilter(field: DMMF.Field) {
    if (field.default) {
        if ((field.default as DMMF.FieldDefault).name) {
            return false;
        }
    }

    if (field.isUpdatedAt) {
        return false;
    }

    if (field.name === 'deletedAt') {
        return false;
    }

    if (hasGenerated(field.documentation)) return false;

    return true;
}

export function __inputFieldSchema(field: DMMF.Field) {
    const schema = inputFieldSchema(field);
    if (schema) {
        return `${field.name}:${schema}`;
    }
    return undefined;
}

export function inputModelSchema(model: DMMF.Model, schemaName: SchemaNameHandler) {
    return `export const ${schemaName(model)} = z.object({ 
        ${model.fields
            .filter(__inputFieldFilter)
            .map(__inputFieldSchema)
            .filter((e) => e)}
    })`;
}

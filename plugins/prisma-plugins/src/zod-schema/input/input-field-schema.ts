import type { DMMF } from '@prisma/generator-helper';
import { hasConnect, hasCreate, hasMax, hasMin, validateDocumentation } from '../helpers/has-key.js';

export type ScalarType = 'String' | 'Decimal' | 'Float' | 'Int' | 'Json' | 'DateTime';

export function scalarInputFieldSchema(field: DMMF.Field) {
    const schema: string[] = [];

    switch (field.type as ScalarType) {
        case 'String': {
            schema.push(`z.string()`);
            break;
        }
        case 'Float':
        case 'Decimal': {
            schema.push(`z.number()`);
            break;
        }
        case 'DateTime': {
            schema.push(`z.iso.date()`);
            break;
        }

        case 'Int': {
            schema.push('z.int()');
            break;
        }

        case 'Json': {
            schema.push('z.record(z.string(), z.any())');
            break;
        }

        default:
            schema.push(`z.any()`);
            break;
    }

    // console.log('DOC: ', field.documentation);
    if (field.documentation) {
        validateDocumentation(field.documentation);

        const max = hasMax(field.documentation);
        const min = hasMin(field.documentation);
        // const maxYear = hasMaxYear(field.documentation);
        // const minYear = hasMinYear(field.documentation);
        // const future = hasFuture(field.documentation);
        // const past = hasPast(field.documentation);

        switch (field.type as ScalarType) {
            case 'String':
            case 'Int': {
                if (max) schema.push(`max(${parseInt(max, 10)})`);
                if (min) schema.push(`min(${parseInt(min, 10)})`);
                break;
            }
            case 'Float':
            case 'Decimal': {
                if (max) schema.push(`max(${parseFloat(max)})`);
                if (min) schema.push(`min(${parseFloat(min)})`);
                break;
            }
            case 'DateTime': {
                //
                break;
            }

            case 'Json': {
                //
                break;
            }
        }
    }

    if (field.isList) {
        schema.push('array()');
    }

    if (!field.isRequired) {
        schema.push('optional()');
    }

    return schema.join('.');
}

export function enumInputFieldSchema(field: DMMF.Field) {
    return `${field.type}Schema`;
}

export function objectInputFieldSchema(field: DMMF.Field) {
    if (hasConnect(field.documentation)) {
        return `ConnectSchema`;
    } else {
        return `z.object({ data: z.lazy(()=>${field.type}CreateInputSchema )})`;
    }
}

/**
 * Create input field schema such as `z.string()`, `z.string().min(3)` etc.
 * @param field
 */
export function inputFieldSchema(field: DMMF.Field) {
    switch (field.kind) {
        case 'object': {
            if (hasConnect(field.documentation) || hasCreate(field.documentation)) {
                return objectInputFieldSchema(field);
            }
            return undefined;
        }
        case 'scalar': {
            return scalarInputFieldSchema(field);
        }
        case 'enum': {
            return enumInputFieldSchema(field);
        }
        case 'unsupported': {
            throw new Error('Unsupported!');
        }
    }
}

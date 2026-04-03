import type { DMMF } from '@prisma/generator-helper';
import type { ParsedPropOptions } from './parse-annotations.js';

export function isRequired(field: DMMF.Field, options: ParsedPropOptions) {
    if (options.required === 'true') {
        return true;
    }

    if (options.required === 'false' || options.nullable === 'true') {
        return false;
    }

    if (field.isList) {
        return false;
    }

    if (field.isRequired === true) {
        return !field.hasDefaultValue;
    }

    return false;
}

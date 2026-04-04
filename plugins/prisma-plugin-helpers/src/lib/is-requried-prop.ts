import type { DMMF } from '@prisma/generator-helper';
import type { ParsedPropOptions } from './parse-prop-options.js';

export function isRequiredProp(field: DMMF.Field, propOptions: ParsedPropOptions) {
    if (propOptions.required === 'true') {
        return true;
    }

    if (propOptions.required === 'false' || propOptions.nullable === 'true') {
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

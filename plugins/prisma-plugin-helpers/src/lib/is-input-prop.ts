import type { DMMF } from '@prisma/generator-helper';
import { isRelationProp } from './is-relation-prop.js';
import { isTimestampProp } from './is-timestamp-prop.js';
import type { ParsedPropOptions } from './parse-prop-options.js';

export function isInputProp(field: DMMF.Field, propOptions: ParsedPropOptions) {
    if (field.isId) {
        return false;
    }

    if (field.isGenerated) {
        return false;
    }

    if (isRelationProp(field)) {
        return false;
    }

    if (isTimestampProp(field)) {
        return false;
    }

    return true;
}

import type { DMMF } from '@prisma/generator-helper';
import { isRelationProp } from './is-relation-prop.js';
import { isTimestampProp } from './is-timestamp-prop.js';

export function isFindByProp(field: DMMF.Field) {
    if ([isTimestampProp(field), isRelationProp(field)].some((e) => e)) {
        return false;
    }

    return true;
}

import type { DMMF } from '@prisma/generator-helper';
import { isRelationProp } from './is-relation-prop.js';
import { isTimestampProp } from './is-timestamp-prop.js';

export function isCountProp(field: DMMF.Field): boolean {
    if ([field.name === 'uuid', field.name === 'id', isTimestampProp(field), isRelationProp(field)].some((e) => e)) {
        return false;
    }

    return true;
}

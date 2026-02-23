import type { DMMF } from '@prisma/generator-helper';
import { Annotations } from '../extract/field-annotation.js';

/**
 * Check the {@link field} should be in the response object
 * Only the fields with **@hidden** annotation will be excluded from the repsonse.
 *
 * @param field Prisma model field
 * @returns boolean
 */
export function isReadField(field: DMMF.Field) {
    if (Annotations.hidden(field.documentation)) {
        return false;
    }

    if (field.kind === 'object') {
        return false;
    }

    return true;
}

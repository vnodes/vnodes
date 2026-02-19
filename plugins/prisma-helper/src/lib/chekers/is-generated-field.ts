import type { DMMF } from '@prisma/generator-helper';
import { FieldAnnotations } from '../extract/field-annotation.js';

/**
 * Check {@link field} has a named default or timestamp
 * - uuid
 * - now
 * - timestamp
 * - createdAt
 * - updatedAt
 * - deletedAt
 * - **@generated** annotation
 *
 * @param field Prisma field
 * @returns boolean
 */
export function isGeneratedField(field: DMMF.Field) {
    if (field.default) {
        if ((field.default as DMMF.FieldDefault).name) {
            return true;
        }
    }

    if (field.isUpdatedAt) {
        return true;
    }

    if (field.type === 'DateTime') {
        if (field.name === 'deletedAt') {
            return true;
        }
    }

    if (field.isId) {
        return true;
    }

    if (
        [FieldAnnotations.generated, FieldAnnotations.internal].some((handler) => handler(field.documentation) !== null)
    ) {
        return true;
    }

    return false;
}

import type { DMMF } from '@prisma/generator-helper';
import { FieldAnnotations } from '../extract/field-annotation.js';
import { isGeneratedField } from './is-generated-field.js';

/**
 * Check the {@link field} should be in the create input object
 * Create inputs
 * - none generated fields
 * - timestamp fields
 * - generated uuid fields
 * - fields with **@internal** annotation
 * - fields with **@ignore** annotation
 *
 * @param field Prisma model field
 * @returns boolean
 */
export function isCreateInputField(field: DMMF.Field) {
    if (isGeneratedField(field)) {
        return false;
    }

    if (FieldAnnotations.internal(field.documentation)) {
        return false;
    }

    if (field.kind === 'object') {
        return false;
    }

    return true;
}

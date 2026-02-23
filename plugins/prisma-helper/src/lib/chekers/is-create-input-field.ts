import type { DMMF } from '@prisma/generator-helper';
import { Annotations } from '../extract/field-annotation.js';
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
        console.log(`${field.name} is a generated field!`, '[isCreateInputField]');
        return false;
    }

    if (Annotations.internal(field.documentation)) {
        console.log(`${field.name} is a internal field!`, '[isCreateInputField]');
        return false;
    }

    if (field.kind === 'object') {
        console.log(`${field.name} is a object field!`, '[isCreateInputField]');
        return false;
    }

    return true;
}

import type { DMMF } from '@prisma/generator-helper';
import { FieldAnnotations } from '../extract/field-annotation.js';
import { isCreateInputField } from './is-create-input-field.js';

export function isUpdateInputField(field: DMMF.Field): boolean {
    if (FieldAnnotations.readonly(field.documentation)) {
        return false;
    }
    return isCreateInputField(field);
}

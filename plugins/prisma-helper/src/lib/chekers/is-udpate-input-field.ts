import type { DMMF } from '@prisma/generator-helper';
import { Annotations } from '../extract/field-annotation.js';
import { isCreateInputField } from './is-create-input-field.js';

export function isUpdateInputField(field: DMMF.Field): boolean {
    if (Annotations.readonly(field.documentation)) {
        return false;
    }
    return isCreateInputField(field);
}

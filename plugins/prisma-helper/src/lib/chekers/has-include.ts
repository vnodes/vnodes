import type { DMMF } from '@prisma/generator-helper';
import { FieldAnnotations } from '../extract/field-annotation.js';

/**
 * Check some of the relation fields have the **@include()** annotation
 * @param model
 * @returns
 */
export function hasInclude(model: DMMF.Model) {
    return model.fields.some((field) => field.kind === 'object' && FieldAnnotations.include(field.documentation));
}

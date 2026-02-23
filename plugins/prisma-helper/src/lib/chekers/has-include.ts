import type { DMMF } from '@prisma/generator-helper';
import { Annotations } from '../extract/field-annotation.js';

/**
 * Check some of the relation fields have the **@include()** annotation
 * @param model
 * @returns
 */
export function hasInclude(model: DMMF.Model) {
    return model.fields.some((field) => field.kind === 'object' && Annotations.include(field.documentation));
}

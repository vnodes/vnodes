import type { DMMF } from '@prisma/generator-helper';

export function hasSoftDeleteField(model: DMMF.Model) {
    return model.fields.some((field) => field.name === 'deletedAt' && field.type === 'DateTime');
}

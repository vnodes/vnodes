import type { DMMF } from '@prisma/generator-helper';

export function isForeinkeyProp(model: DMMF.Model, field: DMMF.Field) {
    const found = model.fields
        .filter((e) => e.kind === 'object')
        .find((e) => {
            return e.relationToFields?.includes(field.name);
        });
    return !!found;
}

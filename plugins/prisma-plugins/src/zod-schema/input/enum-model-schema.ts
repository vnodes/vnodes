import type { DMMF } from '@prisma/generator-helper';

export function enumModelSchema(enumModel: DMMF.DatamodelEnum) {
    return `export const ${enumModel.name}Schema = z.enum([ ${enumModel.values.map((v) => `"${v.name}"`).join(',')} ])`;
}

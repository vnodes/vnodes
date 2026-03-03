import type { DMMF } from '@prisma/generator-helper';

export function classDecleration(model: DMMF.Model, printClassName: (model: DMMF.Model) => string) {
    return `export class ${printClassName(model)}`;
}

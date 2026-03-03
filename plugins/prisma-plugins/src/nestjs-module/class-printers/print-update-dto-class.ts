import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';

export function printUpdateDtoClass(model: DMMF.Model) {
    const createDtoClass = `${model.name}${ClassNameSuffix.CreateDto}`;
    const updateDtoClass = `${model.name}${ClassNameSuffix.UpdateDTo}`;
    return [`export class ${updateDtoClass} extends PartialType(${createDtoClass}) {}`].join('\n');
}

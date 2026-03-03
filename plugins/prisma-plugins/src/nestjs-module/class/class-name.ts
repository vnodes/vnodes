import type { DMMF } from '@prisma/generator-helper';
import type { ClassNameSuffix } from './class-name-suffix.js';

export function className(model: DMMF.Model, nameSuffix: ClassNameSuffix) {
    return `${model.name}${nameSuffix}`;
}

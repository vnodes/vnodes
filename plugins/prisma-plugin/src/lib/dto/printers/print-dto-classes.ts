import type { DMMF } from '@prisma/generator-helper';
import { printCreateDtoClass, printUpdateDtoClass } from './print-create-dto-class.js';
import { printQueryDtoClass } from './print-query-dto-class.js';

export function printDtoClasses(model: DMMF.Model) {

    return [
        `import { Prop, PartialType } from '@vnodes/prop';`,
        `import { Prisma } from '../prisma/client.js';`,
        printCreateDtoClass(model),
        printUpdateDtoClass(model),
        printQueryDtoClass(model),
    ].join('\n')
}

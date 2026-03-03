import { DMMF } from '@prisma/generator-helper';
import { printCreateDtoClass } from './print-create-dto-class.js';
import { printQueryDtoClass } from './print-query-dto-class.js';
import { printReadDtoClass } from './print-read-dto-class.js';
import { printUpdateDtoClass } from './print-update-dto-class.js';

export function printDtoClasses(model: DMMF.Model) {
    return [
        `import { PartialType } from '@vnodes/nestjs/swagger';`,
        `import { Prop } from '@vnodes/nestjs';`,
        printCreateDtoClass(model, 'Prop'),
        printUpdateDtoClass(model),
        printQueryDtoClass(model),
        printReadDtoClass(model, 'Prop'),
    ].join('\n');
}

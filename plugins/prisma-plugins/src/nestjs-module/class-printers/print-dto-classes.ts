import { DMMF } from '@prisma/generator-helper';
import { printCreateDtoClass } from './print-create-dto-class.js';
import { printQueryDtoClass } from './print-query-dto-class.js';
import { printReadDtoClass } from './print-read-dto-class.js';
import { printUpdateDtoClass } from './print-update-dto-class.js';

export function printDtoClasses(model: DMMF.Model) {
    return [
        `
import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';
import * as P from '../prisma/index.js';
`,

        printQueryDtoClass(model),
        printReadDtoClass(model, 'Prop'),
        printCreateDtoClass(model, 'Prop'),
        printUpdateDtoClass(model),
    ].join('\n');
}

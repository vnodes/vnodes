import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';

export function printQueryDtoClass(model: DMMF.Model) {
    return [
        `import { BaseQueryDto, PropOptional } from '@vnodes/property';`,
        `import * as P from '../../../prisma/client.js';`,
        ``,
        `export class ${model.name}${ClassNameSuffix.QueryDto} extends BaseQueryDto {`,
        `    @PropOptional({ enum: P.Prisma.${model.name}ScalarFieldEnum }) orderBy?: P.Prisma.${model.name}ScalarFieldEnum;`,
        `    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;`,
        `}`,
    ].join('\n');
}

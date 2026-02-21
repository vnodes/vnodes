import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TagQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.TagScalarFieldEnum }) orderBy: P.Prisma.TagScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}
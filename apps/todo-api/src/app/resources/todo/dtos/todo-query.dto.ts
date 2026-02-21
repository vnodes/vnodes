import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TodoQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.TodoScalarFieldEnum }) orderBy: P.Prisma.TodoScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

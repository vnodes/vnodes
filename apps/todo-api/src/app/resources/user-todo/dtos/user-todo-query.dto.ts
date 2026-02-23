import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserTodoQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.UserTodoScalarFieldEnum }) orderBy?: P.Prisma.UserTodoScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

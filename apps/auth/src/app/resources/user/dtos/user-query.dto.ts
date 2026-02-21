import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.UserScalarFieldEnum }) orderBy?: P.Prisma.UserScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

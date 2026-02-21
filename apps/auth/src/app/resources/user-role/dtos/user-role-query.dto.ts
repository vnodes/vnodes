import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserRoleQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.UserRoleScalarFieldEnum }) orderBy: P.Prisma.UserRoleScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

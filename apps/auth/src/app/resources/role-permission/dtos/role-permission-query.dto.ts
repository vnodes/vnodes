import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class RolePermissionQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.RolePermissionScalarFieldEnum }) orderBy?: P.Prisma.RolePermissionScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

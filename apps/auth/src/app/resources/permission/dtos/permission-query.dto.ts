import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class PermissionQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.PermissionScalarFieldEnum }) orderBy: P.Prisma.PermissionScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

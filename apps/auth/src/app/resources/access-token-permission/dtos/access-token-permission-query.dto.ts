import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class AccessTokenPermissionQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.AccessTokenPermissionScalarFieldEnum }) orderBy: P.Prisma.AccessTokenPermissionScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}
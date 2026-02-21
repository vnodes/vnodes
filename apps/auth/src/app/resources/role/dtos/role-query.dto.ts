import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class RoleQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.RoleScalarFieldEnum }) orderBy: P.Prisma.RoleScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}
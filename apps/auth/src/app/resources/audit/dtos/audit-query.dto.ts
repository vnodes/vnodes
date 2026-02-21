import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class AuditQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.AuditScalarFieldEnum }) orderBy?: P.Prisma.AuditScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

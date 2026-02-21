import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class SessionQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.SessionScalarFieldEnum }) orderBy: P.Prisma.SessionScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}
import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class HookQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.HookScalarFieldEnum }) orderBy: P.Prisma.HookScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}
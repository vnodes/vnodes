import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class AccessTokenQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.AccessTokenScalarFieldEnum }) orderBy?: P.Prisma.AccessTokenScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

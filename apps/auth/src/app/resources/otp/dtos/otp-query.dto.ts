import { BaseQueryDto, PropOptional } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class OtpQueryDto extends BaseQueryDto {
    @PropOptional({ enum: P.Prisma.OtpScalarFieldEnum }) orderBy?: P.Prisma.OtpScalarFieldEnum;
    @PropOptional({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
}

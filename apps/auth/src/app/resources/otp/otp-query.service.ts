import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { OtpQueryDto } from './dtos/index.js';

@Injectable()
export class OtpQueryService {
    toOrderBy(query: OtpQueryDto): P.Prisma.OtpOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: OtpQueryDto): P.Prisma.OtpWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.OtpWhereInput = {};
        if (search) {
            where.OR = [{ value: { contains: search, mode: 'insensitive' } }];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: OtpQueryDto): P.Prisma.OtpFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}

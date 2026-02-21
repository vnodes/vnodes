import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { SessionQueryDto } from './dtos/index.js';

@Injectable()
export class SessionQueryService {
    toOrderBy(query: SessionQueryDto): P.Prisma.SessionOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: SessionQueryDto): P.Prisma.SessionWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.SessionWhereInput = {};
        if (search) {
            where.OR = [
                { ipAddress: { contains: search, mode: 'insensitive' } },
{ deviceId: { contains: search, mode: 'insensitive' } },
{ token: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: SessionQueryDto): P.Prisma.SessionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),

        };
    }

}
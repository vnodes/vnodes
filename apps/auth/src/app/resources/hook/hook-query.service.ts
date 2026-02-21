import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { HookQueryDto } from './dtos/index.js';

@Injectable()
export class HookQueryService {
    toOrderBy(query: HookQueryDto): P.Prisma.HookOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: HookQueryDto): P.Prisma.HookWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.HookWhereInput = {};
        if (search) {
            where.OR = [
                { url: { contains: search, mode: 'insensitive' } },
                { event: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: HookQueryDto): P.Prisma.HookFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}

import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { AuditQueryDto } from './dtos/index.js';

@Injectable()
export class AuditQueryService {
    toOrderBy(query: AuditQueryDto): P.Prisma.AuditOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: AuditQueryDto): P.Prisma.AuditWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.AuditWhereInput = {};
        if (search) {
            where.OR = [
                { actorId: { contains: search, mode: 'insensitive' } },
                { resource: { contains: search, mode: 'insensitive' } },
                { operation: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: AuditQueryDto): P.Prisma.AuditFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}

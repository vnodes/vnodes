import { Injectable } from '@nestjs/common';
import type * as P from '../../prisma/client.js';
import type { TagQueryDto } from './dtos/index.js';

@Injectable()
export class TagQueryService {
    toOrderBy(query: TagQueryDto): P.Prisma.TagOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: TagQueryDto): P.Prisma.TagWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.TagWhereInput = {};
        if (search) {
            where.OR = [
                
            ];
        }

        if (withDeleted === undefined) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: TagQueryDto): P.Prisma.TagFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}
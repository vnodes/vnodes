import { Injectable } from '@nestjs/common';
import type * as P from '../../prisma/client.js';
import type { TodoQueryDto } from './dtos/index.js';

@Injectable()
export class TodoQueryService {
    toOrderBy(query: TodoQueryDto): P.Prisma.TodoOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: TodoQueryDto): P.Prisma.TodoWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.TodoWhereInput = {};
        if (search) {
            where.OR = [
                
            ];
        }

        if (withDeleted === undefined) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: TodoQueryDto): P.Prisma.TodoFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}
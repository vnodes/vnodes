import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { UserTodoQueryDto } from './dtos/index.js';

@Injectable()
export class UserTodoQueryService {
    toOrderBy(query: UserTodoQueryDto): P.Prisma.UserTodoOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: UserTodoQueryDto): P.Prisma.UserTodoWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.UserTodoWhereInput = {};
        if (search) {
            where.OR = [
                
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: UserTodoQueryDto): P.Prisma.UserTodoFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}
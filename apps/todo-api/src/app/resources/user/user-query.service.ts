import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { UserQueryDto } from './dtos/index.js';

@Injectable()
export class UserQueryService {
    toOrderBy(query: UserQueryDto): P.Prisma.UserOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: UserQueryDto): P.Prisma.UserWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.UserWhereInput = {};
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
{ lastName: { contains: search, mode: 'insensitive' } },
{ middleName: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: UserQueryDto): P.Prisma.UserFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
}
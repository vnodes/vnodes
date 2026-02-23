import { Injectable } from '@nestjs/common';
import type * as P from '../../prisma/client.js';
import type { AccessTokenQueryDto } from './dtos/index.js';

@Injectable()
export class AccessTokenQueryService {
    toOrderBy(query: AccessTokenQueryDto): P.Prisma.AccessTokenOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: AccessTokenQueryDto): P.Prisma.AccessTokenWhereInput | undefined {
        const { search } = query;
        const where: P.Prisma.AccessTokenWhereInput = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { token: { contains: search, mode: 'insensitive' } },
            ];
        }

        return where;
    }

    toFindManyArgs(query: AccessTokenQueryDto): P.Prisma.AccessTokenFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
            include: this.toInclude(),
        };
    }
    toInclude(): P.Prisma.AccessTokenInclude {
        return { accessTokenPermissions: true };
    }
}

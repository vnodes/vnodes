import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { AccessTokenPermissionQueryDto } from './dtos/index.js';

@Injectable()
export class AccessTokenPermissionQueryService {
    toOrderBy(query: AccessTokenPermissionQueryDto): P.Prisma.AccessTokenPermissionOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: AccessTokenPermissionQueryDto): P.Prisma.AccessTokenPermissionWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.AccessTokenPermissionWhereInput = {};
        if (search) {
            where.OR = [];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: AccessTokenPermissionQueryDto): P.Prisma.AccessTokenPermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
            include: this.toInclude(),
        };
    }
    toInclude(): P.Prisma.AccessTokenPermissionInclude {
        return { accessToken: true, permission: true };
    }
}

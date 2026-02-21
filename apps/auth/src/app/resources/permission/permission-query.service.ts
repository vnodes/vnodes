import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { PermissionQueryDto } from './dtos/index.js';

@Injectable()
export class PermissionQueryService {
    toOrderBy(query: PermissionQueryDto): P.Prisma.PermissionOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: PermissionQueryDto): P.Prisma.PermissionWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.PermissionWhereInput = {};
        if (search) {
            where.OR = [
                { app: { contains: search, mode: 'insensitive' } },
                { resource: { contains: search, mode: 'insensitive' } },
                { operation: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: PermissionQueryDto): P.Prisma.PermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
            include: this.toInclude(),
        };
    }
    toInclude(): P.Prisma.PermissionInclude {
        return { rolePermissions: true };
    }
}

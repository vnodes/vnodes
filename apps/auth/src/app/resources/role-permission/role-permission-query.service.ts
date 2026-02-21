import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { RolePermissionQueryDto } from './dtos/index.js';

@Injectable()
export class RolePermissionQueryService {
    toOrderBy(query: RolePermissionQueryDto): P.Prisma.RolePermissionOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: RolePermissionQueryDto): P.Prisma.RolePermissionWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.RolePermissionWhereInput = {};
        if (search) {
            where.OR = [
                
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: RolePermissionQueryDto): P.Prisma.RolePermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),

        };
    }

}
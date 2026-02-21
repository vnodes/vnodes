import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { RoleQueryDto } from './dtos/index.js';

@Injectable()
export class RoleQueryService {
    toOrderBy(query: RoleQueryDto): P.Prisma.RoleOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: RoleQueryDto): P.Prisma.RoleWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.RoleWhereInput = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: RoleQueryDto): P.Prisma.RoleFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
include: this.toInclude(),
        };
    }
   toInclude(): P.Prisma.RoleInclude {
       return { rolePermissions: true, userRoles: true };
   }
}
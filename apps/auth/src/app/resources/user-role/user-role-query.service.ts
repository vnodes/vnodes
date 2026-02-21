import { Injectable } from '@nestjs/common';
import { YesNo } from '@vnodes/property';
import type * as P from '../../prisma/client.js';
import type { UserRoleQueryDto } from './dtos/index.js';

@Injectable()
export class UserRoleQueryService {
    toOrderBy(query: UserRoleQueryDto): P.Prisma.UserRoleOrderByWithRelationInput {
        const { orderBy, orderDir } = query;
        return { [orderBy ?? 'id']: orderDir ?? 'asc' };
    }

    toWhere(query: UserRoleQueryDto): P.Prisma.UserRoleWhereInput | undefined {
        const { search, withDeleted } = query;
        const where: P.Prisma.UserRoleWhereInput = {};
        if (search) {
            where.OR = [];
        }

        if (withDeleted !== YesNo.Yes) {
            where.deletedAt = null;
        }

        return where;
    }

    toFindManyArgs(query: UserRoleQueryDto): P.Prisma.UserRoleFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
            include: this.toInclude(),
        };
    }
    toInclude(): P.Prisma.UserRoleInclude {
        return { user: true, role: true };
    }
}

import type { Prisma as P } from './client.js';
export type QueryMany<T> = {
    take?: number;
    skip?: number;
    search?: string;
    orderBy?: T;
    orderDir?: P.SortOrder;
    withDeleted?: boolean;
};

export class UserDelegateService<
    CreateInput extends P.UserCreateInput = P.UserCreateInput,
    UpdateInput extends P.UserUpdateInput = P.UserUpdateInput,
    QueryInput extends QueryMany<P.UserScalarFieldEnum> = QueryMany<P.UserScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.UserDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.UserWhereInput = {
            OR: [
                { fullName: { contains: query.search, mode: 'insensitive' } },
                { password: { contains: query.search, mode: 'insensitive' } },
                { tags: { has: query.search } },
            ],
        };
        if (!query.withDeleted) {
            whereQuery.deletedAt = null;
        }
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.UserFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByUuid(uuid: string) {
        return await this.repo.findUnique({ where: { uuid } });
    }
    async findByUsername(username: string) {
        return await this.repo.findUnique({ where: { username } });
    }
    async findByFullName(fullName: string) {
        return await this.repo.findFirst({ where: { fullName } });
    }
    async findByPassword(password: string) {
        return await this.repo.findFirst({ where: { password } });
    }
    async findByTags(tags: string) {
        return await this.repo.findFirst({ where: { tags: { has: tags } } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async updateByUuid(uuid: string, data: UpdateInput) {
        return await this.repo.update({ where: { uuid }, data });
    }
    async updateByUsername(username: string, data: UpdateInput) {
        return await this.repo.update({ where: { username }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
    async deleteByUuid(uuid: string) {
        return await this.repo.delete({ where: { uuid } });
    }
    async deleteByUsername(username: string) {
        return await this.repo.delete({ where: { username } });
    }
    async softDeleteById(id: number) {
        return await this.repo.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    async softDeleteByUuid(uuid: string) {
        return await this.repo.update({ where: { uuid }, data: { deletedAt: new Date() } });
    }
    async softDeleteByUsername(username: string) {
        return await this.repo.update({ where: { username }, data: { deletedAt: new Date() } });
    }
}

export class OtpDelegateService<
    CreateInput extends P.OtpCreateInput = P.OtpCreateInput,
    UpdateInput extends P.OtpUpdateInput = P.OtpUpdateInput,
    QueryInput extends QueryMany<P.OtpScalarFieldEnum> = QueryMany<P.OtpScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.OtpDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.OtpWhereInput = { OR: [{ value: { contains: query.search, mode: 'insensitive' } }] };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.OtpFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByUserId(userId: number) {
        return await this.repo.findUnique({ where: { userId } });
    }
    async findByValue(value: string) {
        return await this.repo.findFirst({ where: { value } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async updateByUserId(userId: number, data: UpdateInput) {
        return await this.repo.update({ where: { userId }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
    async deleteByUserId(userId: number) {
        return await this.repo.delete({ where: { userId } });
    }
}

export class RoleDelegateService<
    CreateInput extends P.RoleCreateInput = P.RoleCreateInput,
    UpdateInput extends P.RoleUpdateInput = P.RoleUpdateInput,
    QueryInput extends QueryMany<P.RoleScalarFieldEnum> = QueryMany<P.RoleScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.RoleDelegate) {}

    toWhere(_query: QueryInput) {
        const whereQuery: P.RoleWhereInput = {};
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.RoleFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByName(name: string) {
        return await this.repo.findUnique({ where: { name } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async updateByName(name: string, data: UpdateInput) {
        return await this.repo.update({ where: { name }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
    async deleteByName(name: string) {
        return await this.repo.delete({ where: { name } });
    }
}

export class PermissionDelegateService<
    CreateInput extends P.PermissionCreateInput = P.PermissionCreateInput,
    UpdateInput extends P.PermissionUpdateInput = P.PermissionUpdateInput,
    QueryInput extends QueryMany<P.PermissionScalarFieldEnum> = QueryMany<P.PermissionScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.PermissionDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.PermissionWhereInput = {
            OR: [
                { scope: { contains: query.search, mode: 'insensitive' } },
                { resource: { contains: query.search, mode: 'insensitive' } },
                { operation: { contains: query.search, mode: 'insensitive' } },
            ],
        };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.PermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByScope(scope: string) {
        return await this.repo.findFirst({ where: { scope } });
    }
    async findByResource(resource: string) {
        return await this.repo.findFirst({ where: { resource } });
    }
    async findByOperation(operation: string) {
        return await this.repo.findFirst({ where: { operation } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

export class RolePermissionDelegateService<
    CreateInput extends P.RolePermissionCreateInput = P.RolePermissionCreateInput,
    UpdateInput extends P.RolePermissionUpdateInput = P.RolePermissionUpdateInput,
    QueryInput extends QueryMany<P.RolePermissionScalarFieldEnum> = QueryMany<P.RolePermissionScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.RolePermissionDelegate) {}

    toWhere(_query: QueryInput) {
        const whereQuery: P.RolePermissionWhereInput = {};
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.RolePermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByRoleId(roleId: number) {
        return await this.repo.findFirst({ where: { roleId } });
    }
    async findByPermissionId(permissionId: number) {
        return await this.repo.findFirst({ where: { permissionId } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

export class UserRoleDelegateService<
    CreateInput extends P.UserRoleCreateInput = P.UserRoleCreateInput,
    UpdateInput extends P.UserRoleUpdateInput = P.UserRoleUpdateInput,
    QueryInput extends QueryMany<P.UserRoleScalarFieldEnum> = QueryMany<P.UserRoleScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.UserRoleDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.UserRoleWhereInput = {};
        if (!query.withDeleted) {
            whereQuery.deletedAt = null;
        }
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.UserRoleFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByUserId(userId: number) {
        return await this.repo.findFirst({ where: { userId } });
    }
    async findByRoleId(roleId: number) {
        return await this.repo.findFirst({ where: { roleId } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
    async softDeleteById(id: number) {
        return await this.repo.update({ where: { id }, data: { deletedAt: new Date() } });
    }
}

export class SessionDelegateService<
    CreateInput extends P.SessionCreateInput = P.SessionCreateInput,
    UpdateInput extends P.SessionUpdateInput = P.SessionUpdateInput,
    QueryInput extends QueryMany<P.SessionScalarFieldEnum> = QueryMany<P.SessionScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.SessionDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.SessionWhereInput = {
            OR: [
                { deviceId: { contains: query.search, mode: 'insensitive' } },
                { ip: { contains: query.search, mode: 'insensitive' } },
                { hostname: { contains: query.search, mode: 'insensitive' } },
                { city: { contains: query.search, mode: 'insensitive' } },
                { region: { contains: query.search, mode: 'insensitive' } },
                { country: { contains: query.search, mode: 'insensitive' } },
                { loc: { contains: query.search, mode: 'insensitive' } },
                { org: { contains: query.search, mode: 'insensitive' } },
                { postal: { contains: query.search, mode: 'insensitive' } },
                { timezone: { contains: query.search, mode: 'insensitive' } },
                { agent: { contains: query.search, mode: 'insensitive' } },
            ],
        };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.SessionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByDeviceId(deviceId: string) {
        return await this.repo.findFirst({ where: { deviceId } });
    }
    async findByIp(ip: string) {
        return await this.repo.findFirst({ where: { ip } });
    }
    async findByHostname(hostname: string) {
        return await this.repo.findFirst({ where: { hostname } });
    }
    async findByCity(city: string) {
        return await this.repo.findFirst({ where: { city } });
    }
    async findByRegion(region: string) {
        return await this.repo.findFirst({ where: { region } });
    }
    async findByCountry(country: string) {
        return await this.repo.findFirst({ where: { country } });
    }
    async findByLoc(loc: string) {
        return await this.repo.findFirst({ where: { loc } });
    }
    async findByOrg(org: string) {
        return await this.repo.findFirst({ where: { org } });
    }
    async findByPostal(postal: string) {
        return await this.repo.findFirst({ where: { postal } });
    }
    async findByTimezone(timezone: string) {
        return await this.repo.findFirst({ where: { timezone } });
    }
    async findByAgent(agent: string) {
        return await this.repo.findFirst({ where: { agent } });
    }
    async findByUserId(userId: number) {
        return await this.repo.findFirst({ where: { userId } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

export class AccessTokenDelegateService<
    CreateInput extends P.AccessTokenCreateInput = P.AccessTokenCreateInput,
    UpdateInput extends P.AccessTokenUpdateInput = P.AccessTokenUpdateInput,
    QueryInput extends QueryMany<P.AccessTokenScalarFieldEnum> = QueryMany<P.AccessTokenScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.AccessTokenDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.AccessTokenWhereInput = {
            OR: [
                { description: { contains: query.search, mode: 'insensitive' } },
                { token: { contains: query.search, mode: 'insensitive' } },
            ],
        };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.AccessTokenFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByName(name: string) {
        return await this.repo.findUnique({ where: { name } });
    }
    async findByDescription(description: string) {
        return await this.repo.findFirst({ where: { description } });
    }
    async findByToken(token: string) {
        return await this.repo.findFirst({ where: { token } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async updateByName(name: string, data: UpdateInput) {
        return await this.repo.update({ where: { name }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
    async deleteByName(name: string) {
        return await this.repo.delete({ where: { name } });
    }
}

export class AccessTokenPermissionDelegateService<
    CreateInput extends P.AccessTokenPermissionCreateInput = P.AccessTokenPermissionCreateInput,
    UpdateInput extends P.AccessTokenPermissionUpdateInput = P.AccessTokenPermissionUpdateInput,
    QueryInput extends
        QueryMany<P.AccessTokenPermissionScalarFieldEnum> = QueryMany<P.AccessTokenPermissionScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.AccessTokenPermissionDelegate) {}

    toWhere(_query: QueryInput) {
        const whereQuery: P.AccessTokenPermissionWhereInput = {};
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.AccessTokenPermissionFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByAccessTokenId(accessTokenId: number) {
        return await this.repo.findFirst({ where: { accessTokenId } });
    }
    async findByPermissionId(permissionId: number) {
        return await this.repo.findFirst({ where: { permissionId } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

export class HookDelegateService<
    CreateInput extends P.HookCreateInput = P.HookCreateInput,
    UpdateInput extends P.HookUpdateInput = P.HookUpdateInput,
    QueryInput extends QueryMany<P.HookScalarFieldEnum> = QueryMany<P.HookScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.HookDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.HookWhereInput = {
            OR: [
                { url: { contains: query.search, mode: 'insensitive' } },
                { event: { contains: query.search, mode: 'insensitive' } },
            ],
        };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.HookFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByUrl(url: string) {
        return await this.repo.findFirst({ where: { url } });
    }
    async findByEvent(event: string) {
        return await this.repo.findFirst({ where: { event } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

export class AuditDelegateService<
    CreateInput extends P.AuditCreateInput = P.AuditCreateInput,
    UpdateInput extends P.AuditUpdateInput = P.AuditUpdateInput,
    QueryInput extends QueryMany<P.AuditScalarFieldEnum> = QueryMany<P.AuditScalarFieldEnum>,
> {
    constructor(protected readonly repo: P.AuditDelegate) {}

    toWhere(query: QueryInput) {
        const whereQuery: P.AuditWhereInput = {
            OR: [
                { status: { contains: query.search, mode: 'insensitive' } },
                { scope: { contains: query.search, mode: 'insensitive' } },
                { resource: { contains: query.search, mode: 'insensitive' } },
                { operation: { contains: query.search, mode: 'insensitive' } },
                { actorId: { contains: query.search, mode: 'insensitive' } },
            ],
        };
        return whereQuery;
    }
    toOrderBy(query: QueryInput) {
        if (query.orderBy) {
            return { [query.orderBy]: query.orderDir ?? 'asc' };
        }
        return undefined;
    }
    toFindManyArgs(query: QueryInput): P.AuditFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
            where: this.toWhere(query),
        };
    }
    async find(query: QueryInput) {
        return await this.repo.findMany(this.toFindManyArgs(query));
    }
    async findById(id: number) {
        return await this.repo.findUnique({ where: { id } });
    }
    async findByStatus(status: string) {
        return await this.repo.findFirst({ where: { status } });
    }
    async findByScope(scope: string) {
        return await this.repo.findFirst({ where: { scope } });
    }
    async findByResource(resource: string) {
        return await this.repo.findFirst({ where: { resource } });
    }
    async findByOperation(operation: string) {
        return await this.repo.findFirst({ where: { operation } });
    }
    async findByActorId(actorId: string) {
        return await this.repo.findFirst({ where: { actorId } });
    }
    async create(data: CreateInput) {
        return await this.repo.create({ data });
    }
    async updateById(id: number, data: UpdateInput) {
        return await this.repo.update({ where: { id }, data });
    }
    async deleteById(id: number) {
        return await this.repo.delete({ where: { id } });
    }
}

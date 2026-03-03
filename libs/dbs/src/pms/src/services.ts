import type { Prisma as P } from './client.js';
export type QueryMany<T> = {
    take?: number;
    skip?: number;
    search?: string;
    orderBy?:T
    orderDir?: P.SortOrder
    withDeleted?: boolean
};

export class BaseProjectService<CreateInput extends P.ProjectCreateInput = P.ProjectCreateInput, UpdateInput extends P.ProjectUpdateInput = P.ProjectUpdateInput,QueryInput extends QueryMany<P.ProjectScalarFieldEnum> = QueryMany<P.ProjectScalarFieldEnum>> { 

        constructor(protected readonly repo: P.ProjectDelegate){}

        toWhere(query?: QueryInput){
const whereQuery:P.ProjectWhereInput = query?.search ?   { OR: [ { name: { contains: query.search, mode: "insensitive" } },{ description: { contains: query.search, mode: "insensitive" } } ] } : {}
if(!query?.withDeleted){ 
            whereQuery.deletedAt = null; 
        }
return whereQuery
}
toOrderBy(query?: QueryInput){
if(query?.orderBy){
   return { [query.orderBy]: query.orderDir ?? 'asc' }  
}
return undefined
}
toFindManyArgs(query?: QueryInput ):P.ProjectFindManyArgs {
    return {
        take: query?.take ?? 20,
        skip: query?.skip ?? 0,
        orderBy: this.toOrderBy(query),
        where: this.toWhere(query)
    }
}
async findMany(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }
async findOneById(id: number){ 
        return await this.repo.findUnique({ where: { id } })
    }
async findOneByUuid(uuid: string){ 
        return await this.repo.findUnique({ where: { uuid } })
    }
async findOneByName(name: string){ 
        return await this.repo.findFirst({ where: { name }  })
    }
async findOneByDescription(description: string){ 
        return await this.repo.findFirst({ where: { description }  })
    }
async findOneByCount(count: number){ 
        return await this.repo.findFirst({ where: { count }  })
    }
async findOneByCounts(counts: number){ 
        return await this.repo.findFirst({ where: { counts: { has: counts } } })
    }
async findOneByCountMoreThan(count: number){ 
        return await this.repo.findFirst({ where: {count: { gte: count } } })
    }
async findOneByCountLessThan(count: number){ 
        return await this.repo.findFirst({ where: {count: { lte: count } } })
    }
async createOne(data: CreateInput){ 
            return await this.repo.create({ data })
        }
async updateOneById(id: number, data: UpdateInput){ 
        return await this.repo.update({ where: { id }, data })
    }
async updateOneByUuid(uuid: string, data: UpdateInput){ 
        return await this.repo.update({ where: { uuid }, data })
    }
async deleteOneById(id: number){ 
        return await this.repo.delete({ where: { id } })
    }
async deleteOneByUuid(uuid: string){ 
        return await this.repo.delete({ where: { uuid } })
    }
async softDeleteOneById(id: number){ 
        return await this.repo.update({ where: { id }, data:{ deletedAt: new Date() } })
    }
async softDeleteOneByUuid(uuid: string){ 
        return await this.repo.update({ where: { uuid }, data:{ deletedAt: new Date() } })
    }
    }


    export class BaseProjectController<CreateInput extends P.ProjectCreateInput = P.ProjectCreateInput, UpdateInput extends P.ProjectUpdateInput = P.ProjectUpdateInput,QueryInput extends QueryMany<P.ProjectScalarFieldEnum> = QueryMany<P.ProjectScalarFieldEnum>> {

    constructor(protected readonly service: BaseProjectService){}

    findMany(query: QueryInput) {
        return this.service.findMany(query);
    }

    findOneById(id: string) {
        return this.service.findOneByUuid(id);
    }

    createOne(data: CreateInput) {
        return this.service.createOne(data);
    }

    updateOneById(id: string, data: UpdateInput) {
        return this.service.updateOneByUuid(id, data);
    }

    deleteOneById(id: string) {
        return this.service.deleteOneByUuid(id);
    }
        
    }
    
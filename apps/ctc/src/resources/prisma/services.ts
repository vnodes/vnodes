import type { Prisma as P } from './client.js';
export type QueryMany<T> = {
    take?: number;
    skip?: number;
    search?: string;
    orderBy?:T
    orderDir?: P.SortOrder
    withDeleted?: boolean
};

export class BaseContactService<CreateInput extends P.ContactCreateInput = P.ContactCreateInput, UpdateInput extends P.ContactUpdateInput = P.ContactUpdateInput,QueryInput extends QueryMany<P.ContactScalarFieldEnum> = QueryMany<P.ContactScalarFieldEnum>> { 

        constructor(protected readonly repo: P.ContactDelegate){}

        toInclude(){

return  {primaryEmail: true,primaryPhone: true,primaryAddress: true,emails: true,phones: true,addresses: true}
}
toWhere(query?: QueryInput){
const whereQuery:P.ContactWhereInput = query?.search ?   { OR: [ { firstName: { contains: query.search, mode: "insensitive" } },{ lastName: { contains: query.search, mode: "insensitive" } },{ middleName: { contains: query.search, mode: "insensitive" } },{ preferedName: { contains: query.search, mode: "insensitive" } },{ profiles: { has: query.search } } ] } : {}
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
toFindManyArgs(query?: QueryInput ):P.ContactFindManyArgs {
    return {
        take: query?.take ?? 20,
        skip: query?.skip ?? 0,
        orderBy: this.toOrderBy(query),
        where: this.toWhere(query),
        include: this.toInclude()
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
async findOneByFirstName(firstName: string){ 
        return await this.repo.findFirst({ where: { firstName }  })
    }
async findOneByLastName(lastName: string){ 
        return await this.repo.findFirst({ where: { lastName }  })
    }
async findOneByMiddleName(middleName: string){ 
        return await this.repo.findFirst({ where: { middleName }  })
    }
async findOneByPreferedName(preferedName: string){ 
        return await this.repo.findFirst({ where: { preferedName }  })
    }
async findOneByProfiles(profiles: string){ 
        return await this.repo.findFirst({ where: { profiles: { has: profiles } } })
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


    export class BaseContactController<CreateInput extends P.ContactCreateInput = P.ContactCreateInput, UpdateInput extends P.ContactUpdateInput = P.ContactUpdateInput,QueryInput extends QueryMany<P.ContactScalarFieldEnum> = QueryMany<P.ContactScalarFieldEnum>> {

    constructor(protected readonly service: BaseContactService){}

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
    

export class BaseEmailService<CreateInput extends P.EmailCreateInput = P.EmailCreateInput, UpdateInput extends P.EmailUpdateInput = P.EmailUpdateInput,QueryInput extends QueryMany<P.EmailScalarFieldEnum> = QueryMany<P.EmailScalarFieldEnum>> { 

        constructor(protected readonly repo: P.EmailDelegate){}

        toInclude(){

return  undefined
}
toWhere(query?: QueryInput){
const whereQuery:P.EmailWhereInput = query?.search ?   { OR: [ { email: { contains: query.search, mode: "insensitive" } },{ notes: { contains: query.search, mode: "insensitive" } } ] } : {}
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
toFindManyArgs(query?: QueryInput ):P.EmailFindManyArgs {
    return {
        take: query?.take ?? 20,
        skip: query?.skip ?? 0,
        orderBy: this.toOrderBy(query),
        where: this.toWhere(query),
        include: this.toInclude()
    }
}
async findMany(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }
async findOneById(id: number){ 
        return await this.repo.findUnique({ where: { id } })
    }
async findOneByEmail(email: string){ 
        return await this.repo.findFirst({ where: { email }  })
    }
async findOneByNotes(notes: string){ 
        return await this.repo.findFirst({ where: { notes }  })
    }
async findOneByContactId(contactId: number){ 
        return await this.repo.findFirst({ where: { contactId }  })
    }
async findOneByContactIdMoreThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { gte: contactId } } })
    }
async findOneByContactIdLessThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { lte: contactId } } })
    }
async createOne(data: CreateInput){ 
            return await this.repo.create({ data })
        }
async updateOneById(id: number, data: UpdateInput){ 
        return await this.repo.update({ where: { id }, data })
    }
async deleteOneById(id: number){ 
        return await this.repo.delete({ where: { id } })
    }
async softDeleteOneById(id: number){ 
        return await this.repo.update({ where: { id }, data:{ deletedAt: new Date() } })
    }
    }


    export class BaseEmailController<CreateInput extends P.EmailCreateInput = P.EmailCreateInput, UpdateInput extends P.EmailUpdateInput = P.EmailUpdateInput,QueryInput extends QueryMany<P.EmailScalarFieldEnum> = QueryMany<P.EmailScalarFieldEnum>> {

    constructor(protected readonly service: BaseEmailService){}

    findMany(query: QueryInput) {
        return this.service.findMany(query);
    }

    findOneById(id: string) {
        return this.service.findOneById(+id);
    }

    createOne(data: CreateInput) {
        return this.service.createOne(data);
    }

    updateOneById(id: string, data: UpdateInput) {
        return this.service.updateOneById(+id, data);
    }

    deleteOneById(id: string) {
        return this.service.deleteOneById(+id);
    }
        
    }
    

export class BasePhoneService<CreateInput extends P.PhoneCreateInput = P.PhoneCreateInput, UpdateInput extends P.PhoneUpdateInput = P.PhoneUpdateInput,QueryInput extends QueryMany<P.PhoneScalarFieldEnum> = QueryMany<P.PhoneScalarFieldEnum>> { 

        constructor(protected readonly repo: P.PhoneDelegate){}

        toInclude(){

return  undefined
}
toWhere(query?: QueryInput){
const whereQuery:P.PhoneWhereInput = query?.search ?   { OR: [ { phone: { contains: query.search, mode: "insensitive" } },{ notes: { contains: query.search, mode: "insensitive" } } ] } : {}
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
toFindManyArgs(query?: QueryInput ):P.PhoneFindManyArgs {
    return {
        take: query?.take ?? 20,
        skip: query?.skip ?? 0,
        orderBy: this.toOrderBy(query),
        where: this.toWhere(query),
        include: this.toInclude()
    }
}
async findMany(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }
async findOneById(id: number){ 
        return await this.repo.findUnique({ where: { id } })
    }
async findOneByPhone(phone: string){ 
        return await this.repo.findFirst({ where: { phone }  })
    }
async findOneByNotes(notes: string){ 
        return await this.repo.findFirst({ where: { notes }  })
    }
async findOneByContactId(contactId: number){ 
        return await this.repo.findFirst({ where: { contactId }  })
    }
async findOneByContactIdMoreThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { gte: contactId } } })
    }
async findOneByContactIdLessThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { lte: contactId } } })
    }
async createOne(data: CreateInput){ 
            return await this.repo.create({ data })
        }
async updateOneById(id: number, data: UpdateInput){ 
        return await this.repo.update({ where: { id }, data })
    }
async deleteOneById(id: number){ 
        return await this.repo.delete({ where: { id } })
    }
async softDeleteOneById(id: number){ 
        return await this.repo.update({ where: { id }, data:{ deletedAt: new Date() } })
    }
    }


    export class BasePhoneController<CreateInput extends P.PhoneCreateInput = P.PhoneCreateInput, UpdateInput extends P.PhoneUpdateInput = P.PhoneUpdateInput,QueryInput extends QueryMany<P.PhoneScalarFieldEnum> = QueryMany<P.PhoneScalarFieldEnum>> {

    constructor(protected readonly service: BasePhoneService){}

    findMany(query: QueryInput) {
        return this.service.findMany(query);
    }

    findOneById(id: string) {
        return this.service.findOneById(+id);
    }

    createOne(data: CreateInput) {
        return this.service.createOne(data);
    }

    updateOneById(id: string, data: UpdateInput) {
        return this.service.updateOneById(+id, data);
    }

    deleteOneById(id: string) {
        return this.service.deleteOneById(+id);
    }
        
    }
    

export class BaseAddressService<CreateInput extends P.AddressCreateInput = P.AddressCreateInput, UpdateInput extends P.AddressUpdateInput = P.AddressUpdateInput,QueryInput extends QueryMany<P.AddressScalarFieldEnum> = QueryMany<P.AddressScalarFieldEnum>> { 

        constructor(protected readonly repo: P.AddressDelegate){}

        toInclude(){

return  undefined
}
toWhere(query?: QueryInput){
const whereQuery:P.AddressWhereInput = query?.search ?   { OR: [ { street: { contains: query.search, mode: "insensitive" } },{ city: { contains: query.search, mode: "insensitive" } },{ notes: { contains: query.search, mode: "insensitive" } },{ unit: { contains: query.search, mode: "insensitive" } },{ province: { contains: query.search, mode: "insensitive" } },{ state: { contains: query.search, mode: "insensitive" } },{ country: { contains: query.search, mode: "insensitive" } },{ zip: { contains: query.search, mode: "insensitive" } } ] } : {}
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
toFindManyArgs(query?: QueryInput ):P.AddressFindManyArgs {
    return {
        take: query?.take ?? 20,
        skip: query?.skip ?? 0,
        orderBy: this.toOrderBy(query),
        where: this.toWhere(query),
        include: this.toInclude()
    }
}
async findMany(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }
async findOneById(id: number){ 
        return await this.repo.findUnique({ where: { id } })
    }
async findOneByStreet(street: string){ 
        return await this.repo.findFirst({ where: { street }  })
    }
async findOneByCity(city: string){ 
        return await this.repo.findFirst({ where: { city }  })
    }
async findOneByNotes(notes: string){ 
        return await this.repo.findFirst({ where: { notes }  })
    }
async findOneByUnit(unit: string){ 
        return await this.repo.findFirst({ where: { unit }  })
    }
async findOneByProvince(province: string){ 
        return await this.repo.findFirst({ where: { province }  })
    }
async findOneByState(state: string){ 
        return await this.repo.findFirst({ where: { state }  })
    }
async findOneByCountry(country: string){ 
        return await this.repo.findFirst({ where: { country }  })
    }
async findOneByZip(zip: string){ 
        return await this.repo.findFirst({ where: { zip }  })
    }
async findOneByContactId(contactId: number){ 
        return await this.repo.findFirst({ where: { contactId }  })
    }
async findOneByContactIdMoreThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { gte: contactId } } })
    }
async findOneByContactIdLessThan(contactId: number){ 
        return await this.repo.findFirst({ where: {contactId: { lte: contactId } } })
    }
async createOne(data: CreateInput){ 
            return await this.repo.create({ data })
        }
async updateOneById(id: number, data: UpdateInput){ 
        return await this.repo.update({ where: { id }, data })
    }
async deleteOneById(id: number){ 
        return await this.repo.delete({ where: { id } })
    }
async softDeleteOneById(id: number){ 
        return await this.repo.update({ where: { id }, data:{ deletedAt: new Date() } })
    }
    }


    export class BaseAddressController<CreateInput extends P.AddressCreateInput = P.AddressCreateInput, UpdateInput extends P.AddressUpdateInput = P.AddressUpdateInput,QueryInput extends QueryMany<P.AddressScalarFieldEnum> = QueryMany<P.AddressScalarFieldEnum>> {

    constructor(protected readonly service: BaseAddressService){}

    findMany(query: QueryInput) {
        return this.service.findMany(query);
    }

    findOneById(id: string) {
        return this.service.findOneById(+id);
    }

    createOne(data: CreateInput) {
        return this.service.createOne(data);
    }

    updateOneById(id: string, data: UpdateInput) {
        return this.service.updateOneById(+id, data);
    }

    deleteOneById(id: string) {
        return this.service.deleteOneById(+id);
    }
        
    }
    
export type AutowireMethodName = 'findMany' | 'findOneById' | 'createOne' | 'updateOneById' | 'deleteOneById';

export interface ResourceController<ReadDto, UpdateDto, QueryDto, CreateDto, ID = string | number> {
    findMany(query: QueryDto): Promise<ReadDto>;
    createOne(data: CreateDto): Promise<ReadDto>;
    deleteOneById(id: ID): Promise<ReadDto>;
    findOneById(id: ID): Promise<ReadDto>;
    updateOneById(id: ID, data: UpdateDto): Promise<ReadDto>;
}

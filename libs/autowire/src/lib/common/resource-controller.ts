import type { Any } from '@vnodes/types';

export type ResourceControllerMethodName = 'findMany' | 'findOneById' | 'createOne' | 'updateOneById' | 'deleteOneById';

export interface ResourceController<ID extends number | string = number> {
    findMany(query: Any): Promise<Any>;
    createOne(data: Any): Promise<Any>;
    deleteOneById(id: ID): Promise<Any>;
    findOneById(id: ID): Promise<Any>;
    updateOneById(id: ID, data: Any): Promise<Any>;
}

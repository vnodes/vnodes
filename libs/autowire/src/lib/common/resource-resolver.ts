import type { Any } from '@vnodes/types';

export type ResourceResolverMethodName = keyof ResourceResolver;

export interface ResourceResolver<ID extends number | string = number> {
    findMany(query: Any): Promise<Any>;
    createOne(data: Any): Promise<Any>;
    deleteOneById(id: ID): Promise<Any>;
    findOneById(id: ID): Promise<Any>;
    updateOneById(id: ID, data: Any): Promise<Any>;
    created(): AsyncIterableIterator<Any, Any>;
    updated(): AsyncIterableIterator<Any, Any>;
    deleted(): AsyncIterableIterator<Any, Any>;
}

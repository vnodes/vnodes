import type { Any } from '@vnodes/types';
import type { RelationParam, UnsetRelationParam } from '../query-args.js';

export interface ResourceOperations<
    Entity = Any,
    CreateInput = Any,
    UpdateInput = Any,
    QueryDto = Any,
    Response = Any,
    ResponseMany = Any,
> {
    find?(query: QueryDto, userId?: number, ...args: Any[]): ResponseMany;
    findById?(id: number, userId?: number, ...args: Any[]): Response;
    create?(data: CreateInput, userId?: number, ...args: Any[]): Response;
    update?(id: number, data: Partial<UpdateInput>, userId?: number, ...args: Any[]): Response;
    delete?(id: number, userId?: number, ...args: Any[]): Response;
    softDelete?(id: number, userId?: number, ...args: Any[]): Response;
    addRelation?(params: RelationParam<Entity>, userId?: number, ...args: Any[]): Response;
    removeRelation?(params: RelationParam<Entity>, userId?: number, ...args: Any[]): Response;
    setRelation?(params: RelationParam<Entity>, userId?: number, ...args: Any[]): Response;
    unsetRelation?(params: UnsetRelationParam<Entity>, userId?: number, ...args: Any[]): Response;
}

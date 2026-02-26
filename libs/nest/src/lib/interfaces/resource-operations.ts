/** biome-ignore-all lint/suspicious/noExplicitAny: Any */
import type { RelationParam, UnsetRelationParam } from '../decorators/query-args.js';

export interface ResourceOperations<
    Entity = any,
    CreateInput = any,
    UpdateInput = any,
    QueryDto = any,
    Response = any,
    ResponseMany = any,
> {
    find?(query: QueryDto, userId?: number, ...args: any[]): ResponseMany;
    findById?(id: number, userId?: string, ...args: any[]): Response;
    create?(data: CreateInput, userId?: number, ...args: any[]): Response;
    update?(id: number, data: Partial<UpdateInput>, userId?: number, ...args: any[]): Response;
    delete?(id: number, userId?: number, ...args: any[]): Response;
    softDelete?(id: number, userId?: number, ...args: any[]): Response;
    addRelation?(params: RelationParam<Entity>, userId?: number, ...args: any[]): Response;
    removeRelation?(params: RelationParam<Entity>, userId?: number, ...args: any[]): Response;
    setRelation?(params: RelationParam<Entity>, userId?: number, ...args: any[]): Response;
    unsetRelation?(params: UnsetRelationParam<Entity>, userId?: number, ...args: any[]): Response;
}

import type { RelationParam, UnsetRelationParam } from '../query-args.js';

export interface ResourceOperations<
    Entity = unknown,
    CreateInput = unknown,
    UpdateInput = unknown,
    QueryDto = unknown,
    Response = unknown,
    ResponseMany = unknown,
> {
    find?(query: QueryDto): ResponseMany;
    findById?(id: number): Response;
    create?(data: CreateInput): Response;
    update?(id: number, data: Partial<UpdateInput>): Response;
    delete?(id: number): Response;
    softDelete?(id: number): Response;
    addRelation?(params: RelationParam<Entity>): Response;
    removeRelation?(params: RelationParam<Entity>): Response;
    setRelation?(params: RelationParam<Entity>): Response;
    unsetRelation?(params: UnsetRelationParam<Entity>): Response;
}

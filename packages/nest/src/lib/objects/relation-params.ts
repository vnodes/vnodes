export interface UnsetRelationParams {
  id: number;
  relationName: string;
}
export interface RelationParams extends UnsetRelationParams {
  relationId: number;
}

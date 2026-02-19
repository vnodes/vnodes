export type QueryArgs<T> = {
    take?: number;
    skip?: number;
    search?: string;
    orderBy?: keyof T;
    orderDir?: 'asc' | 'desc';
};

export type UnsetRelationParam<T> = {
    id: number;
    relationName: keyof T;
};

export type RelationParam<T> = {
    relationId: number;
} & UnsetRelationParam<T>;

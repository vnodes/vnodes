export enum RestParam {
    ID = 'id',
    RELATION_ID = 'relationId',
    RELATION_NAME = 'relationName',
}

export enum RestPath {
    ID = ':id',
    RELATION_ID = ':id/:relationName/:relationId',
    RELATION_NAME = ':id/:relationName',
}

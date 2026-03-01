export enum OperationPrefix {
    FIND_MANY = 'findMany',
    FIND_ONE = 'findOne',
    UPDATE_ONE = 'updateOne',
    DELETE_ONE = 'deleteOne',
    CREATE_ONE = 'createOne',
    ADD_RELATION = 'addRelation',
    REMOVE_RELATION = 'removeRelation',
    SET_RELATION = 'setRelation',
    UNSET_RELATION = 'unsetRelation',
}

export enum CrudOperation {
    FIND_ALL = 'findMany',
    FIND_ONE_BY_ID = 'findOneById',
    UPDATE_ONE_BY_ID = 'updateOneById',
    DELETE_ONE_BY_ID = 'deleteOneById',
    CREATE_ONE = 'createOne',
}

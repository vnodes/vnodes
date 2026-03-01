export const ParamKey = {
    ID: 'id',
    RELATION_ID: 'relationId',
    RELATION_NAME: 'relationName',
} as const;

export const ParamKeyTemplate = {
    ID: `:${ParamKey.ID}`,
    RELATION_ID: `:${ParamKey.RELATION_ID}`,
    RELATION_NAME: `:${ParamKey.RELATION_NAME}`,
} as const;

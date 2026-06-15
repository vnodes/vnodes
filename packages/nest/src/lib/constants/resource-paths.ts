export const ResourcePathParams = {
  ID: 'id',
  RELATION_NAME: 'relationName',
  RELATION_ID: 'relationId',
};

const R = ResourcePathParams;

export const ResourcePaths = {
  BY_ID: `:${R.ID}`,
  RELATION: `:${R.ID}/:${R.RELATION_NAME}/:${R.RELATION_ID}`,
  UNSET_RELATION: `:${R.ID}/:${R.RELATION_NAME}`,
  BULK: 'bulk',
};

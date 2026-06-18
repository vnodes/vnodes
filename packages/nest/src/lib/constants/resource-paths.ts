/**
 * Paramter names used accross the http controllers
 */
export const ResourcePathName = {
  ID: 'id',
  RELATION_NAME: 'relationName',
  RELATION_ID: 'relationId',
};

const R = ResourcePathName;

/**
 * Paramter paths (: prefixed) used accross the http controllers
 */
export const ResourcePaths = {
  BY_ID: `:${R.ID}`,
  RELATION: `:${R.ID}/:${R.RELATION_NAME}/:${R.RELATION_ID}`,
  UNSET_RELATION: `:${R.ID}/:${R.RELATION_NAME}`,
  MANY: 'many',
};

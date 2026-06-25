/**
 * Paramter names used accross the http controllers
 */
export const ResourcePathName = {
  ID: 'id',
  RELATION: 'relation',
  RELATION_NAME: 'relationName',
  RELATION_ID: 'relationId',
  BY: 'by',
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
  BY: `by/:${ResourcePathName.BY}`,
};

// Get one          : GET     users/:id
// Get many         : GET     users
// Create one       : POST    users
// Create many      : POST    users/many
// Set relation     : POST    users/:id/:relationName/:relationId
// Update one       : PATCH   users/:id
// Update many      : PATCH   users?username=some
// Add relation     : PATCH   users/:id/:relationName/:relationId
// Delete one       : DELETE  users/:id
// Delete many      : DELETE  users?username=some
// Unset relation   : DELETE  users/:id/:relationName
// Remove relation  : DELETE  users/:id/:relationName/:relationId

/**
 * Resource methods utilized accross the resource service and controller classes
 */
export const ResourceMethod = {
  createOne: 'createOne',
  createMany: 'createMany',

  findMany: 'findMany',
  findOneById: 'findOneById',

  updateOneById: 'updateOneById',
  updateMany: 'updateMany',

  deleteOneById: 'deleteOneById',
  deleteMany: 'deleteMany',

  addRelation: 'addRelation',
  removeRelation: 'removeRelation',

  setRelation: 'setRelation',
  unsetRelation: 'unsetRelation',
} as const;

/**
 * Resource method name type
 */
export type ResourceMethod = keyof typeof ResourceMethod;

/**
 * Resource methods as a readable list
 */
export const ResourceMethods = Object.keys(ResourceMethod) as Readonly<ResourceMethod[]>;

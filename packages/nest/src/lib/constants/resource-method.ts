
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

export type ResourceMethod = keyof typeof ResourceMethod;

export const ResourceMethods = Object.keys(ResourceMethod) as Readonly<
  ResourceMethod[]
>;

import type { AnyFunction } from '@vnodes/types';

export interface ResourceOperation {
  findMany?: AnyFunction;
  findOneById?: AnyFunction;
  createOne?: AnyFunction;
  updateOneById?: AnyFunction;
  deleteOneById?: AnyFunction;
  addRelation?: AnyFunction;
  removeRelation?: AnyFunction;
  setRelation?: AnyFunction;
  unsetRelation?: AnyFunction;
}

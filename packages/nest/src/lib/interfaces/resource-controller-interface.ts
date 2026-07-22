import type { AnyFunction } from '@vnodes/types';

export interface ResourceControllerInterface {
  findMany?: AnyFunction;
  findOneById?: AnyFunction;
  createOne?: AnyFunction;
  createMany?: AnyFunction;
  updateOneById?: AnyFunction;
  updateMany?: AnyFunction;
  deleteOneById?: AnyFunction;
  deleteMany?: AnyFunction;

  addRelation?: AnyFunction;
  removeRelation?: AnyFunction;
  setRelation?: AnyFunction;
  unsetRelation?: AnyFunction;
}

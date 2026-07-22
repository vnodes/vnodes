import { OperationName } from '../constants/operation-name.js';
import { type ResourceMethod } from '../constants/resource-method.js';

export function inferOperationName(resourceMethod: ResourceMethod): OperationName {
  switch (resourceMethod) {
    case 'createOne':
      return OperationName.CREATE_ONE;
    case 'createMany':
      return OperationName.CREATE_MANY;
    case 'findMany':
      return OperationName.FIND_MANY;
    case 'findOneById':
      return OperationName.FIND_ONE;
    case 'updateOneById':
      return OperationName.UPDATE_ONE;
    case 'updateMany':
      return OperationName.UPDATE_MANY;
    case 'deleteOneById':
      return OperationName.DELETE_ONE;
    case 'deleteMany':
      return OperationName.DELETE_MANY;
    case 'addRelation':
      return OperationName.UPDATE_MANY;
    case 'removeRelation':
      return OperationName.DELETE_ONE;
    case 'setRelation':
      return OperationName.UPDATE_ONE;
    case 'unsetRelation':
      return OperationName.DELETE_ONE;
    default:
      throw new Error(`Invalid resource method, ${resourceMethod}`);
  }
}

import { ResourceMethod } from '../constants/resource-method.js';
import { inferOperationName } from './infer-operation-name.js';
import { inferResourceName } from './infer-resource-name.js';

export function inferEventName(className: string, methodName: ResourceMethod) {
  const resourceName = inferResourceName(className);
  const operationName = inferOperationName(methodName);

  return `${resourceName}.${operationName}`;
}

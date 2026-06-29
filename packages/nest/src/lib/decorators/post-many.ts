import { Post } from '@nestjs/common';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function PostMany(): MethodDecorator {
  return (...args) => {
    [Post(ResourcePaths.MANY), Operation(OperationName.CREATE_MANY)].forEach((e) => e(...args));
  };
}

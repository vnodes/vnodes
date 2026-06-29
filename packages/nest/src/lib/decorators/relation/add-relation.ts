import { Patch } from '@nestjs/common';
import { OperationName } from '../../constants/operation-name.js';
import { ResourcePaths } from '../../constants/resource-paths.js';
import { Operation } from '../../metadata/operation.js';

export function AddRelation(): MethodDecorator {
  return (...args) => {
    [Patch(ResourcePaths.RELATION), Operation(OperationName.UPDATE_ONE)].forEach((e) => e(...args));
  };
}

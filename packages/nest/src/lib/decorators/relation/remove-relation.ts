import { Delete } from '@nestjs/common';
import { OperationName } from '../../constants/operation-name.js';
import { ResourcePaths } from '../../constants/resource-paths.js';
import { Operation } from '../../metadata/operation.js';

export function RemoveRelation(): MethodDecorator {
  return (...args) => {
    [Delete(ResourcePaths.RELATION), Operation(OperationName.UPDATE_ONE)].forEach((e) =>
      e(...args),
    );
  };
}

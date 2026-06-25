import { Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../../constants/messages.js';
import { OperationName } from '../../constants/operation-name.js';
import { ResourcePaths } from '../../constants/resource-paths.js';
import { Operation } from '../../metadata/operation.js';

export function UnsetRelation(): MethodDecorator {
  return (...args) => {
    [
      Delete(ResourcePaths.UNSET_RELATION),
      Operation(OperationName.UPDATE_ONE),
      ApiOperation({ summary: Messages.UNSET_RELATION }),
    ].forEach((e) => e(...args));
  };
}

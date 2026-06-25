import { Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../../constants/messages.js';
import { OperationName } from '../../constants/operation-name.js';
import { ResourcePaths } from '../../constants/resource-paths.js';
import { Operation } from '../../metadata/operation.js';

export function RemoveRelation(): MethodDecorator {
  return (...args) => {
    [
      Delete(ResourcePaths.RELATION),
      Operation(OperationName.UPDATE_ONE),
      ApiOperation({ summary: Messages.REMOVE_RELATION }),
    ].forEach((e) => e(...args));
  };
}

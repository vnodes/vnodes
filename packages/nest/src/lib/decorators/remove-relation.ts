import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { Delete } from '@nestjs/common';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';
import { OperationName } from '../constants/operation-name.js';

export function RemoveRelation(): MethodDecorator {
  return (...args) => {
    Delete(ResourcePaths.RELATION)(...args);
    Operation(OperationName.UPDATE_ONE)(...args);
    ApiOperation({ summary: Messages.REMOVE_RELATION })(...args);
  };
}

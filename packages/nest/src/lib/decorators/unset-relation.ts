import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { Delete } from '@nestjs/common';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';
import { OperationName } from '../constants/operation-name.js';

export function UnsetRelation(): MethodDecorator {
  return (...args) => {
    Delete(ResourcePaths.UNSET_RELATION)(...args);
    Operation(OperationName.UPDATE_ONE)(...args);
    ApiOperation({ summary: Messages.UNSET_RELATION })(...args);
  };
}

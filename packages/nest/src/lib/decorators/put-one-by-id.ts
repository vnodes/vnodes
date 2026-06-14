import { Put } from '@nestjs/common';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';
import { OperationName } from '../constants/operation-name.js';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';

export function PutOneById(): MethodDecorator {
  return (...args) => {
    Put(ResourcePaths.BY_ID)(...args);
    Operation(OperationName.UPDATE_ONE)(...args);
    ApiOperation({ summary: Messages.UPDATE_ENTITY_BY_ID })(...args);
  };
}

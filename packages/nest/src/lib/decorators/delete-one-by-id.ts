import { Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function DeleteOneById(): MethodDecorator {
  return (...args) => {
    [
      Delete(ResourcePaths.BY_ID),
      Operation(OperationName.DELETE_ONE),
      ApiOperation({ summary: Messages.DELETE_ENTITY_BY_ID }),
    ].forEach((e) => e(...args));
  };
}

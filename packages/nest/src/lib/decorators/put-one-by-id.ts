import { Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function PutOneById(): MethodDecorator {
  return (...args) => {
    [
      Put(ResourcePaths.BY_ID),
      Operation(OperationName.UPDATE_ONE),
      ApiOperation({ summary: Messages.UPDATE_ENTITY_BY_ID }),
    ].forEach((e) => e(...args));
  };
}

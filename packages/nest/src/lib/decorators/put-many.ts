import { Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function PutMany(): MethodDecorator {
  return (...args) => {
    [
      Put(ResourcePaths.MANY),
      Operation(OperationName.UPDATE_MANY),
      ApiOperation({ summary: Messages.UPDATE_ENTITIES }),
    ].forEach((e) => e(...args));
  };
}

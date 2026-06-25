import { Get } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePathName, ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function GetOneById(): MethodDecorator {
  return (...args) => {
    [
      Get(ResourcePaths.ID),
      ApiParam({ name: ResourcePathName.ID }),
      Operation(OperationName.FIND_ONE),
      ApiOperation({ summary: Messages.FIND_ENTITY_BY_ID }),
    ].forEach((e) => e(...args));
  };
}

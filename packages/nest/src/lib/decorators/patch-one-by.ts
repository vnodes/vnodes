import { Put } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePathName, ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function PatchOneBy(propertyName: string): MethodDecorator {
  return (...args) => {
    [
      Put(`${propertyName}/${ResourcePaths.VALUE}`),
      ApiParam({ name: ResourcePathName.VALUE }),
      Operation(OperationName.UPDATE_ONE),
      ApiOperation({ summary: `${Messages.UPDATE_ENTITY_BY} ${propertyName}` }),
    ].forEach((e) => e(...args));
  };
}

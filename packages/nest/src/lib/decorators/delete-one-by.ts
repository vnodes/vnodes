import { Delete } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { ResourcePathName, ResourcePaths } from '../constants/resource-paths.js';
import { Operation } from '../metadata/operation.js';

export function DeleteOneBy(propertyName: string): MethodDecorator {
  return (...args) => {
    [
      Delete(`${propertyName}/${ResourcePaths.VALUE}`),
      ApiParam({ name: ResourcePathName.VALUE }),
      Operation(OperationName.DELETE_ONE),
      ApiOperation({ summary: `${Messages.DELETE_ENTITY_BY} ${propertyName}` }),
    ].forEach((e) => e(...args));
  };
}

import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../../constants/messages.js';
import { OperationName } from '../../constants/operation-name.js';
import { ResourcePaths } from '../../constants/resource-paths.js';
import { Operation } from '../../metadata/operation.js';

export function SetRelation(): MethodDecorator {
  return (...args) => {
    [
      Post(ResourcePaths.RELATION),
      Operation(OperationName.UPDATE_ONE),
      ApiOperation({ summary: Messages.SET_RELATION }),
    ].forEach((e) => e(...args));
  };
}

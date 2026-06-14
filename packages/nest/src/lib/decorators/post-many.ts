import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PostMany(): MethodDecorator {
  return (...args) => {
    Post()(...args);
    Operation(OperationName.CREATE_MANY)(...args);
    ApiOperation({ summary: Messages.CREATE_ENTITIES })(...args);
  };
}

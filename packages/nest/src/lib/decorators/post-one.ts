import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PostOne(): MethodDecorator {
  return (...args) => {
    [
      Post(),
      Operation(OperationName.CREATE_ONE),
      ApiOperation({ summary: Messages.CREATE_ENTITY }),
    ].forEach((e) => e(...args));
  };
}

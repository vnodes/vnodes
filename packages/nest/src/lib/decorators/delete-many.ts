import { Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function DeleteMany(): MethodDecorator {
  return (...args) => {
    [
      Delete(),
      Operation(OperationName.DELETE_MANY),
      ApiOperation({ summary: Messages.DELETE_ENTITIES }),
    ].forEach((e) => e(...args));
  };
}

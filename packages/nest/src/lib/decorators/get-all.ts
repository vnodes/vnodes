import { Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function GetAll(): MethodDecorator {
  return (...args) => {
    [
      Get(),
      Operation(OperationName.FIND_MANY),
      ApiOperation({ summary: Messages.FIND_ENTITIES }),
    ].forEach((e) => e(...args));
  };
}

import { Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PatchMany(): MethodDecorator {
  return (...args) => {
    [
      Patch(),
      Operation(OperationName.UPDATE_MANY),
      ApiOperation({ summary: Messages.UPDATE_ENTITIES }),
    ].forEach((e) => e(...args));
  };
}

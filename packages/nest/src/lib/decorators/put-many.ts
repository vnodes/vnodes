import { Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PutMany(): MethodDecorator {
  return (...args) => {
    Put()(...args);
    Operation(OperationName.UPDATE_MANY)(...args);
    ApiOperation({ summary: Messages.UPDATE_ENTITIES })(...args);
  };
}

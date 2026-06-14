import { Get } from '@nestjs/common';
import { Operation } from '../metadata/operation.js';
import { OperationName } from '../constants/operation-name.js';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';

export function GetAll(): MethodDecorator {
  return (...args) => {
    Get()(...args);
    Operation(OperationName.READ_MANY)(...args);
    ApiOperation({ summary: Messages.FIND_ENTITIES })(...args);
  };
}

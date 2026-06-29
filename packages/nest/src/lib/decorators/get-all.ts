import { Get } from '@nestjs/common';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function GetAll(): MethodDecorator {
  return (...args) => {
    [Get(), Operation(OperationName.FIND_MANY)].forEach((e) => e(...args));
  };
}

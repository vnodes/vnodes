import { Delete } from '@nestjs/common';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function DeleteMany(): MethodDecorator {
  return (...args) => {
    [Delete(), Operation(OperationName.DELETE_MANY)].forEach((e) => e(...args));
  };
}

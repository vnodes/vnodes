import { Patch } from '@nestjs/common';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PatchMany(): MethodDecorator {
  return (...args) => {
    [Patch(), Operation(OperationName.UPDATE_MANY)].forEach((e) => e(...args));
  };
}

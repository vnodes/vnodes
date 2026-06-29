import { Post } from '@nestjs/common';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PostOne(): MethodDecorator {
  return (...args) => {
    [Post(), Operation(OperationName.CREATE_ONE)].forEach((e) => e(...args));
  };
}

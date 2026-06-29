import { Delete } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function DeleteOneBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Delete(`${kebab}/:${camel}`), Operation(OperationName.DELETE_ONE)].forEach((e) => e(...args));
  };
}

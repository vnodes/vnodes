import { Get } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function GetOneBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Get(`${kebab}/:${camel}`), Operation(OperationName.FIND_ONE)].forEach((e) => e(...args));
  };
}

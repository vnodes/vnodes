import { Get } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function GetManyBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Get(`many/${kebab}/:${camel}`), Operation(OperationName.FIND_MANY)].forEach((e) => e(...args));
  };
}

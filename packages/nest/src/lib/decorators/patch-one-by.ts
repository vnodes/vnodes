import { Patch } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PatchOneBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Patch(`${kebab}/:${camel}`), Operation(OperationName.UPDATE_ONE)].forEach((e) => e(...args));
  };
}

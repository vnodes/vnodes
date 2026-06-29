import { Patch } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function PatchManyBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Patch(`many/${kebab}/:${camel}`), Operation(OperationName.UPDATE_MANY)].forEach((e) =>
      e(...args),
    );
  };
}

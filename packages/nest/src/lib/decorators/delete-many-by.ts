import { Delete } from '@nestjs/common';
import { names } from '@vnodes/names';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function DeleteManyBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [Delete(`many/${kebab}/:${camel}`), Operation(OperationName.DELETE_MANY)].forEach((e) =>
      e(...args),
    );
  };
}

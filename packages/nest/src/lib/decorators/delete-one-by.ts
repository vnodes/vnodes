import { Delete } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { names } from '@vnodes/names';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function DeleteOneBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [
      Delete(`${kebab}/:${camel}`),
      ApiParam({ name: camel }),
      Operation(OperationName.DELETE_ONE),
      ApiOperation({ summary: `${Messages.DELETE_ENTITY_BY} ${propertyName}` }),
    ].forEach((e) => e(...args));
  };
}

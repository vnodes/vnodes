import { Get } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { names } from '@vnodes/names';
import { Messages } from '../constants/messages.js';
import { OperationName } from '../constants/operation-name.js';
import { Operation } from '../metadata/operation.js';

export function GetOneBy(propertyName: string): MethodDecorator {
  const { camel, kebab } = names(propertyName);
  return (...args) => {
    [
      Get(`${kebab}/:${camel}`),
      ApiParam({ name: camel }),
      Operation(OperationName.FIND_ONE),
      ApiOperation({ summary: `${Messages.FIND_ENTITY_BY} ${propertyName}` }),
    ].forEach((e) => e(...args));
  };
}

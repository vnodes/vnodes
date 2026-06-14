import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Messages } from '../constants/messages.js';
import { Operation } from '../metadata/operation.js';
import { OperationName } from '../constants/operation-name.js';

export const DeleteMany = () =>
  applyDecorators(
    Delete(),
    Operation(OperationName.DELETE_MANY),
    ApiOperation({ summary: Messages.DELETE_ENTITIES }),
  );

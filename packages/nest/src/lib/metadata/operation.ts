import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
import type { OperationName } from '../constants/operation-name.js';

/**
 * Explictly set the {@link MetadataToken.OPERATION}
 */
export const Operation = (operationName: OperationName): MethodDecorator =>
  SetMetadata(MetadataToken.OPERATION, operationName);

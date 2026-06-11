import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

export const OperationName = (operationName: string): MethodDecorator =>
  SetMetadata(MetadataToken.OPERATION_NAME_METADATA_TOKEN, operationName);

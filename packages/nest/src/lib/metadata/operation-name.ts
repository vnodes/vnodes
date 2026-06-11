import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '@vnodes/types';

export const OperationName = (operationName: string): MethodDecorator =>
  SetMetadata(MetadataToken.OPERATION_NAME_METADATA_TOKEN, operationName);

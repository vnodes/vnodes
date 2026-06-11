import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '@vnodes/types';

export const ResourceName = (resourceName: string): ClassDecorator =>
  SetMetadata(MetadataToken.RESOURCE_NAME_METADATA_TOKEN, resourceName);

import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

export const ResourceName = (resourceName: string): ClassDecorator =>
  SetMetadata(MetadataToken.RESOURCE_NAME_METADATA_TOKEN, resourceName);

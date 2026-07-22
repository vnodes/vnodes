import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';
/**
 * Explictly set {@link MetadataToken.RESOURCE}
 */
export const Resource = (resourceName: string): ClassDecorator =>
  SetMetadata(MetadataToken.RESOURCE, resourceName);

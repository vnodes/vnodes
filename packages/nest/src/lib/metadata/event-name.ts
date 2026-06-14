import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Method level metadata decorator, sets {@link MetadataToken.EVENT_NAME} metadata to the context.
 */
export const EvenetName = (eventName: string): ClassDecorator =>
  SetMetadata(MetadataToken.EVENT_NAME, eventName);

import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '../constants/metadata-token.js';

export const EvenetName = (eventName: string): ClassDecorator =>
  SetMetadata(MetadataToken.EVENT_NAME_METADATA_TOKEN, eventName);

import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from '@vnodes/types';

export const EvenetName = (eventName: string): ClassDecorator =>
  SetMetadata(MetadataToken.EVENT_NAME_METADATA_TOKEN, eventName);

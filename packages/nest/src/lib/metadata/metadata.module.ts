import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service.js';

/**
 * Nestjs module, provides {@link MetadataService} which has dedicated gettter for each {@link MetadataToken}
 */
@Module({
  providers: [MetadataService],
  exports: [MetadataService],
})
export class MetadataModule {}

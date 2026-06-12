import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { MetadataModule } from '../metadata/metadata.module.js';
import { throttlerAsyncOptions } from './throttler-module-options.js';
import { cacheModuleAsyncOptions } from './cache-module-options.js';
import { EnvyModule } from '@vnodes/config';
import { provideCommons } from './provide-commons.js';

@Global()
@Module({
  imports: [
    MetadataModule,
    EnvyModule,
    EventEmitterModule.forRoot({
      delimiter: '.',
      global: true,
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync(cacheModuleAsyncOptions()),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions()),
  ],
  providers: [...provideCommons()],
})
export class CommonModule {}

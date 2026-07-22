import { CacheInterceptor } from '@nestjs/cache-manager';
import { ClassSerializerInterceptor, type Provider } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmitInterceptor } from '../interceptors/emit.interceptor.js';
import { GlobalValidationPipe } from '../pipes/global-validation-pipe.js';

/**
 * Provides a list of common providers that are required for almost all projects
 */
export function provideCommons(): Provider[] {
  return [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EmitInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: GlobalValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: ClassSerializerInterceptor,
    },
  ];
}

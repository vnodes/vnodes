/** biome-ignore-all lint/style/useImportType: DI */

import { Cache } from '@nestjs/cache-manager';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import { type Observable, tap } from 'rxjs';

/**
 * Clear cache when create/update operations happen
 */
@Injectable()
export class CacheEvictInterceptor<T> implements NestInterceptor<T> {
    constructor(private cacheManager: Cache) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            tap(async () => {
                await this.cacheManager.clear();
            }),
        );
    }
}

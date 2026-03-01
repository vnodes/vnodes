import { Cache } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Apply this interceptor to methods that write/delete entity so when the operation is successful, the cache is cleaned up
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

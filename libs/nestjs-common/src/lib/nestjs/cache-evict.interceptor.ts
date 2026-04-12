import { CACHE_MANAGER, type Cache } from '@vnodes/nestjs/cache-manager';
import {
    type CallHandler,
    type ExecutionContext,
    Inject,
    Injectable,
    type NestInterceptor,
} from '@vnodes/nestjs/common';
import { type Observable, tap } from '@vnodes/nestjs/rxjs';

/**
 * Clear cache when create/update operations happen
 */
@Injectable()
export class CacheEvictInterceptor<T> implements NestInterceptor<T> {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            tap(async () => {
                await this.cacheManager.clear();
            }),
        );
    }
}

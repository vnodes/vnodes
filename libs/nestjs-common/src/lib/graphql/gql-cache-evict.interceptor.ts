import { GqlExecutionContext } from '@vnodes/graphql';
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
export class GqlCacheEvictInterceptor<T> implements NestInterceptor<T> {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();
        const isMutation = info.operation.operation === 'mutation';

        return next.handle().pipe(
            tap(async (data) => {
                if (data && isMutation) {
                    await this.cacheManager.clear();
                }
            }),
        );
    }
}

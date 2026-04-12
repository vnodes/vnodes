import { GqlExecutionContext } from '@vnodes/graphql';
import { CacheInterceptor } from '@vnodes/nestjs/cache-manager';
import { type ExecutionContext, Injectable } from '@vnodes/nestjs/common';

@Injectable()
export class GqlCacheInterceptor extends CacheInterceptor {
    override trackBy(context: ExecutionContext): string | undefined {
        const gqlCtx = GqlExecutionContext.create(context);
        const info = gqlCtx.getInfo();

        // Only cache Queries, not Mutations
        if (info.operation.operation !== 'query') {
            return undefined;
        }

        const args = gqlCtx.getArgs();
        // Create a unique key based on the field name and the arguments
        return `${info.fieldName}-${JSON.stringify(args)}`;
    }

    // We override this to prevent it from checking request.method
    override isRequestCacheable(context: ExecutionContext): boolean {
        const gqlCtx = GqlExecutionContext.create(context);
        const info = gqlCtx.getInfo();
        return info.operation.operation === 'query';
    }
}

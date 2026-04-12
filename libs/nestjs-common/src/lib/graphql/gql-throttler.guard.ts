import { GqlExecutionContext } from '@vnodes/graphql';
import { type ExecutionContext, Injectable } from '@vnodes/nestjs/common';
import { ThrottlerGuard } from '@vnodes/nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
    override getRequestResponse(context: ExecutionContext) {
        const gqlCtx = GqlExecutionContext.create(context);
        const ctx = gqlCtx.getContext();

        return {
            req: ctx.req,
            res: ctx.res,
        };
    }
}

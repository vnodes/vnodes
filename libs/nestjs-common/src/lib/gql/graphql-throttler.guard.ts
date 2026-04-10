/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { GqlExecutionContext } from '@vnodes/graphql';
import { type ExecutionContext, Injectable } from '@vnodes/nestjs/common';
import { ThrottlerGuard } from '@vnodes/nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
    override getRequestResponse(context: ExecutionContext) {
        const gqlCtx = GqlExecutionContext.create(context);
        const ctx = gqlCtx.getContext();

        // 1. Try to find the request in the GraphQL context (Fastify style)
        // 2. Fallback to standard HTTP context (Useful if used on REST endpoints too)
        const req = ctx?.request || ctx?.req || context.switchToHttp().getRequest();
        const res = ctx?.reply || ctx?.res || context.switchToHttp().getResponse();

        return { req, res };
    }

    protected override async getTracker(req: any): Promise<string> {
        // Optional chaining (?.) is key here to stop the crash
        const ip = req?.ip || req?.headers?.['x-forwarded-for'] || req?.raw?.ip || '127.0.0.1';

        return ip;
    }
}

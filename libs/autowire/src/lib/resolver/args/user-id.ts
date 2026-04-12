import { GqlExecutionContext } from '@vnodes/graphql';
import { createParamDecorator, type ExecutionContext } from '@vnodes/nestjs/common';
import { definedOrThrow } from '@vnodes/utils';

export const UserId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    // 1. Convert the generic context to a GraphQL execution context
    const ctx = GqlExecutionContext.create(context);

    // 2. Access the request object from the Gql context
    const req = ctx.getContext().req;

    // 3. Return the ID or throw
    return definedOrThrow(req.user?.id);
});

import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

/**
 * get the current user's id
 */
export const UserId = createParamDecorator((__data, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user?.id;
});

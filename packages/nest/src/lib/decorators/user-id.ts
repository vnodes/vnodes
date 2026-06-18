import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((__data, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user.id;
});

import { createParamDecorator } from '@nestjs/common';
import { definedOrThrow } from '@vnodes/utils';

export const UserId = createParamDecorator((_, context) => {
    return definedOrThrow(context.switchToHttp().getRequest().user.id);
});

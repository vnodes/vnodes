import { createParamDecorator } from '@nestjs/common';
import type { Any } from '@vnodes/types';

/**
 * Extract the current user's id from the request. The function will check the keys for user's id
 * - userId
 * - userid
 * - user.id
 * - OR null
 */
export const UserId = createParamDecorator((_data, context) => {
    const req = context.switchToHttp().getRequest<Any>();
    return (req.userId || req.userid || req.user.id) ?? null;
});

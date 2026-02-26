import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import type { UserSession } from './user-session.js';

/**
 * Extract the authenticated user's id from the request (request.user.id)
 */
export const UserId = createParamDecorator((_data, context) => {
    const req = context.switchToHttp().getRequest<Partial<UserSession>>();
    const userId = req.session?.userId;

    if (!userId) {
        throw new UnauthorizedException('User session not found or USER_ID missing');
    }

    return userId;
});

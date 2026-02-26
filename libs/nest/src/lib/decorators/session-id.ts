import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import type { UserSession } from './user-session.js';

/**
 * Extract the current session's id from the request. The function will check the keys for session's id
 * - sessionId
 * - sessionid
 * - session.id
 * - OR null
 */
export const SessionId = createParamDecorator((_data, context) => {
    const req = context.switchToHttp().getRequest<Partial<UserSession>>();
    const sessionId = req.session?.id;

    if (sessionId === undefined || sessionId === null) {
        throw new UnauthorizedException('User session not found or missing ID');
    }
    return sessionId;
});

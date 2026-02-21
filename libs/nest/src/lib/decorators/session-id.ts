import { createParamDecorator } from '@nestjs/common';
import type { Any } from '@vnodes/types';

/**
 * Extract the current session's id from the request. The function will check the keys for session's id
 * - sessionId
 * - sessionid
 * - session.id
 * - OR null
 */
export const SessionId = createParamDecorator((_data, context) => {
    const req = context.switchToHttp().getRequest<Any>();
    return (req.sessionId || req.sessionid || req.session?.id) ?? null;
});

import { createParamDecorator } from '@nestjs/common';
import { User } from '../services/user-manager.js';
import { AuthRequest } from '../types/auth-request.js';

/**
 * Get the user info {@link UserInfo} of the current session from the request
 */
export const UserInfo = createParamDecorator<User>((_, context) => {
    return context.switchToHttp().getRequest<AuthRequest>().user;
});

/**
 * Get the access token of the current session from the request
 */
export const AccessToken = createParamDecorator<string>((_, context) => {
    return context.switchToHttp().getRequest<AuthRequest>().accessToken;
});

import { createParamDecorator } from '@nestjs/common';
import { AuthRequest } from 'src/types/auth-request.js';

export const UserInfo = createParamDecorator((_, context) => {
    return context.switchToHttp().getRequest<AuthRequest>().user;
});

export const AccessToken = createParamDecorator((_, context) => {
    return context.switchToHttp().getRequest<AuthRequest>().accessToken;
});

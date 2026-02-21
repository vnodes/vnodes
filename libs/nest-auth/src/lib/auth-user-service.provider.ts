import type { Provider, Type } from '@nestjs/common';
import { AuthUserService } from './auth-user.service.js';

export function provideAuthUserService(authUserService: Type<AuthUserService>): Provider {
    return {
        provide: AuthUserService,
        useClass: authUserService,
    };
}

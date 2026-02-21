import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PublicResource, SessionId } from '@vnodes/nest';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@PublicResource()
@Controller('auth')
export class AuthLoginController {
    constructor(@Inject(AuthService) protected readonly service: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginDto })
    login(body: LoginDto) {
        return this.service.login(body);
    }

    @Post('logout')
    loginWithOtp(@SessionId() sessionId: number) {
        return this.service.logout(sessionId);
    }
}

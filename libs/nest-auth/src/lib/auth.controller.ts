import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public, SessionId } from '@vnodes/nest';
import { AuthService } from './auth.service.js';
import type { LoginDto } from './dto/login.dto.js';
import type { LoginWithOtpDto } from './dto/login-with-otp.js';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) protected readonly service: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() body: LoginDto) {
        return this.service.login(body);
    }

    @Public()
    @Post('login')
    loginWithOtp(@Body() body: LoginWithOtpDto) {
        return this.service.loginWithOtp(body);
    }

    /**
     * Delete the current session by id
     * @param sessionId
     */
    @Post('logout')
    logout(@SessionId() sessionId: number) {
        return this.service.logout(sessionId);
    }
}

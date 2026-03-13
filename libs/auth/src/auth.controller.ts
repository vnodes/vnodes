import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '@vnodes/metadata';
import { AccessToken } from './context/context.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthService } from './services/auth.service.js';

@Throttle({ default: { limit: 6, ttl: 30_000 } })
@Controller('auth')
export class AuthController {
    constructor(protected readonly authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Post('logout')
    logout(@AccessToken() accessToken: string) {
        return this.authService.logout(accessToken);
    }

    @Public()
    @Post('forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDto) {
        return this.authService.forgotPassword(body);
    }
}

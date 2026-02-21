import { Injectable } from '@nestjs/common';
import type { AuthUserService } from './auth-user.service.js';
import type { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import type { LoginWithOtpDto } from './dto/login-with-otp.js';

@Injectable()
export class AuthService {
    constructor(protected readonly authUserService: AuthUserService) {}

    login(_login: LoginDto) {}
    logout(_sessionId: number) {}
    forgotPassword(_forgotPasswordDto: ForgotPasswordDto) {}
    loginWithOtp(_loginWithOtpDto: LoginWithOtpDto) {}
}

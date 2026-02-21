import { Body, Controller, Inject, Ip, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { DeviceId, PublicResource } from '@vnodes/nest';
import { AuthService } from './auth.service.js';
import type { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import type { LoginWithOptDto } from './dto/login-with-otp.dto.js';

@PublicResource()
@Controller('auth')
export class AuthLoginController {
    constructor(@Inject(AuthService) protected readonly service: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginDto })
    login(@Body() body: LoginDto, @Ip() ip: string) {
        return this.service.login(body, undefined, ip);
    }

    @Post('forgot-password')
    @ApiBody({ type: LoginDto })
    forgotPassword(@Body() body: ForgotPasswordDto, @DeviceId() deviceId: string, @Ip() ip: string) {
        return this.service.forgotPassword(body, deviceId, ip);
    }

    @Post('login-with-otp')
    @ApiBody({ type: LoginDto })
    loginWithOpt(@Body() body: LoginWithOptDto, @DeviceId() deviceId: string, @Ip() ip: string) {
        return this.service.loginWithOptDto(body, deviceId, ip);
    }
}

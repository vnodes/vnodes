import { Body, Controller, Inject, Ip, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { DeviceId, Public, SessionId } from '@vnodes/nest';
import { AuthService } from './auth.service.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginWithOptDto } from './dto/login-with-otp.dto.js';

@Controller('auth')
export class AuthLoginController {
    constructor(@Inject(AuthService) protected readonly service: AuthService) {}

    @Public()
    @Post('login')
    @ApiBody({
        type: LoginDto,
        examples: { Admin: { value: { username: 'admin@org.com', password: '!Password123.' } } },
    })
    login(@Body() body: LoginDto, @Ip() ip: string) {
        return this.service.login(body, undefined, ip);
    }

    @Public()
    @Post('forgot-password')
    @ApiBody({
        type: ForgotPasswordDto,
        examples: {
            Admin: {
                value: { username: 'admin@org.com' },
            },
        },
    })
    forgotPassword(@Body() body: ForgotPasswordDto, @DeviceId() deviceId: string, @Ip() ip: string) {
        return this.service.forgotPassword(body, deviceId, ip);
    }

    @Public()
    @Post('login-with-otp')
    @ApiBody({
        type: LoginWithOptDto,
        examples: {
            Admin: {
                value: { username: 'admin@org.com', otp: '!Password123.' },
            },
        },
    })
    loginWithOpt(@Body() body: LoginWithOptDto, @DeviceId() deviceId: string, @Ip() ip: string) {
        return this.service.loginWithOptDto(body, deviceId, ip);
    }

    @Post('logout')
    logout(@SessionId() sessinId: number) {
        return this.service.logout(sessinId);
    }
}

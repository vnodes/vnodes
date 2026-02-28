import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service.js';
import { LoginDto, LoginResponseDto } from './dtos/logind.dto.js';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthUserService) protected readonly userService: AuthUserService) {}

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiResponse({ type: LoginResponseDto })
    async login(@Body() body: LoginDto) {
        const token = await this.userService.login(body.username, body.password);
        return new LoginResponseDto(token);
    }
}

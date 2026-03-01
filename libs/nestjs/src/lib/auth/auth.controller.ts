import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service.js';
import { LoginDto, LoginResponseDto } from './dtos/logind.dto.js';

@Controller('auth')
export class AuthController {
    constructor(protected readonly userService: AuthUserService) {}

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiResponse({ type: LoginResponseDto })
    async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
        const token = await this.userService.login(body.username, body.password);
        return new LoginResponseDto(token);
    }
}

import {
    BadRequestException,
    type CanActivate,
    type ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Any } from '@vnodes/types';
import type { Request } from 'express';
import type { JwtPayloadDto } from '../dto/jwt-payload.dto.js';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        @Inject(Reflector) protected readonly reflector: Reflector,
        @Inject(JwtService) protected readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();

        const token = req.headers.authorization?.split(' ').pop();

        if (token) {
            try {
                const payload: JwtPayloadDto = await this.jwtService.verifyAsync(token);
                (req as Any).session = payload;
            } catch (err) {
                throw new UnauthorizedException('Invalid token');
            }
            throw new BadRequestException('You already loged in');
        }

        return true;
    }
}

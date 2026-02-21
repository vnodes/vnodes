import { type CanActivate, type ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isPublic } from '@vnodes/nest';
import type { Any } from '@vnodes/types';
import type { Request } from 'express';
import type { JwtPayloadDto } from '../dto/jwt-payload.dto.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(Reflector) protected readonly reflector: Reflector,
        @Inject(JwtService) protected readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();

        if (isPublic(this.reflector, context)) {
            return true;
        }

        const token = req.headers.authorization?.split(' ').pop();

        if (!token) throw new UnauthorizedException('No token ');

        try {
            const payload: JwtPayloadDto = await this.jwtService.verifyAsync(token);
            (req as Any).session = payload;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        return false;
    }
}

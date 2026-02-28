import { type CanActivate, type ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { getRequiredPermissions, getRequiredRoles } from '../../custom/index.js';
import { AuthUserService } from '../auth-user.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(Reflector) protected readonly reflector: Reflector,
        @Inject(AuthUserService) protected readonly userService: AuthUserService,
    ) {}
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();

        const token = this.extractToken(req);
        const user = await this.userService.findByToken(token);
        const permissions = getRequiredPermissions(this.reflector, context);
        const roles = getRequiredRoles(this.reflector, context);

        if (permissions) {
            if (!user.hasPermissions(permissions)) {
                return false;
            }
        }

        if (roles) {
            if (!user.hasRoles(roles)) {
                return false;
            }
        }

        return true;
    }

    extractToken(request: Request) {
        const rawToken = request.headers.authorization;
        if (!rawToken) {
            throw new UnauthorizedException('No token');
        }

        const [type, token] = rawToken.split(' ');

        if (type === 'Bearer' && token) return token;

        throw new UnauthorizedException('Invalid token ');
    }
}

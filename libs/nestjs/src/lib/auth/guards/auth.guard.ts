import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { getPermissions, getRoles, isPublic } from '../../metadata/index.js';
import { AuthUserService } from '../auth-user.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        protected readonly reflector: Reflector,
        protected readonly userService: AuthUserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        if (isPublic(this.reflector, context)) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(req);
        const user = await this.userService.findByToken(token);
        const permissions = getPermissions(this.reflector, context);
        const roles = getRoles(this.reflector, context);

        if (!permissions && !roles) {
            return true;
        }

        if (user.isAdmin()) {
            return true;
        }

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

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getPermissions, getRoles, isPublic } from '@vnodes/metadata';
import { AuthRequest } from 'src/types/auth-request.js';
import { UserService } from '../services/user.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        protected readonly reflector: Reflector,
        protected readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        if (isPublic(this.reflector, context)) {
            return true;
        }
        const permissions = getPermissions(this.reflector, context);
        const roles = getRoles(this.reflector, context);
        const requiredPolicy = ((permissions || roles) && permissions.length > 0) || roles.length > 0;

        if (!requiredPolicy) {
            return true;
        }

        const authRequest = context.switchToHttp().getRequest<AuthRequest>();
        const token = this.extractToken(authRequest);
        const user = await this.userService.findByToken(token);

        authRequest.user = user.user;

        if (user.isAdmin()) {
            return true;
        }

        if (permissions.length > 0) {
            if (!user.hasPermissions(permissions)) {
                return false;
            }
        }

        if (roles.length > 0) {
            if (!user.hasRoles(roles)) {
                return false;
            }
        }

        return true;
    }

    extractToken(request: AuthRequest) {
        const rawToken = request.headers.authorization;
        if (!rawToken) {
            throw new UnauthorizedException('No token');
        }

        const [type, token] = rawToken.split(' ');

        if (type === 'Bearer' && token) return token;

        throw new UnauthorizedException('Invalid token ');
    }
}

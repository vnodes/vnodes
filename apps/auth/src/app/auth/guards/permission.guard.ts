import { type CanActivate, type ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isPublic } from '@vnodes/nest';
import type { JwtPayloadDto } from '../dto/jwt-payload.dto.js';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(@Inject(Reflector) protected readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext) {
        if (isPublic(this.reflector, context)) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const session = req.session as JwtPayloadDto;

        const userPermissions = session.permissions ?? '';

        const resourceClass = context.getClass();

        const operation = context.getHandler().name;
        const resource = resourceClass.name.replace('Controller', '');
        const requiredPermission = new RegExp(`auth.${resource}.${operation}`, 'i');
        const adminPermission = /all.all.all/i;

        if (userPermissions.match(adminPermission)) {
            return true;
        }

        if (userPermissions.match(requiredPermission)) {
            return true;
        }
        return false;
    }
}

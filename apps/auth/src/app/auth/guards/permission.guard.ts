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
        const session = req.session;
        const resourceClass = context.getClass();

        const operation = context.getHandler();
        const resource = resourceClass.name.replace('Controller', '');

        if ((session as JwtPayloadDto).permissions.find((e) => e.endsWith(`auth.${resource}.${operation}`))) {
            return true;
        }
        return false;
    }
}

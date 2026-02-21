import { type CanActivate, type ExecutionContext, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_API_TOKEN') protected readonly authApiToken: string,
        @Inject('APP_ID') protected readonly app: string,
        @Inject('AUTH_API_PATH') protected readonly authApiPath: string,
    ) {}
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const handler = context.getHandler();
        const targetClassName = context.getClass().name;
        const resourceName = targetClassName.replace('Controller', '');
        const token = req.headers.uthorization;

        const response = await axios.post(
            this.authApiPath,
            { token, app: this.app, resource: resourceName, operation: handler },
            { headers: { Authorization: `Bearer ${this.authApiToken}` } },
        );

        if (response.status === HttpStatus.CREATED) {
            return true;
        }

        return false;
    }
}

import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { Any } from '@vnodes/types';
import type { Request } from 'express';

@Injectable()
export class AppInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest<Request>();

        (req as Any).userId = 500;
        return next.handle();
    }
}

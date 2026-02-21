import { type CallHandler, type ExecutionContext, Injectable, Logger, type NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    protected readonly logger = new Logger('Request');

    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest<Request>();
        const now = Date.now();
        const { method, url } = req;
        return next.handle().pipe(
            tap(() => {
                this.logger.log(`${method} ${url} | ${Date.now() - now}ms`);
            }),
        );
    }
}

/** biome-ignore-all lint/style/useImportType: DI */

import { getOperationName, getResourceName, isEmitResponse } from '@vnodes/metadata';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@vnodes/nestjs/common';
import { Reflector } from '@vnodes/nestjs/core';
import { EventEmitter2 } from '@vnodes/nestjs/event-emitter';
import { type Observable, tap } from '@vnodes/nestjs/rxjs';

/**
 * Emit response if the method has EmitResponse decorator
 */
@Injectable()
export class EmitResponseInterceptor<T> implements NestInterceptor<T> {
    constructor(
        private readonly reflector: Reflector,
        private readonly emitter: EventEmitter2,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            tap(async (data) => {
                if (isEmitResponse(this.reflector, context)) {
                    const resourceName = getResourceName(this.reflector, context);
                    const operationName = getOperationName(this.reflector, context);
                    const eventName = `${resourceName}.${operationName}`;
                    this.emitter.emit(eventName, data);
                }
            }),
        );
    }
}

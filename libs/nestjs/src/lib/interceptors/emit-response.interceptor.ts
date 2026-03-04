import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import { getOperationName, getResourceName, isEmitResponse } from '../metadata/metadata.js';

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
                console.log(
                    'Is emit response: ',
                    isEmitResponse(this.reflector, context),
                    context.getClass().name,
                    context.getHandler().name,
                );

                if (isEmitResponse(this.reflector, context)) {
                    const resourceName = getResourceName(this.reflector, context);
                    const operationName = getOperationName(this.reflector, context);

                    const eventName = `${resourceName}.${operationName}`;
                    console.log('Emitting event : ', eventName);
                    this.emitter.emit(eventName, data);
                }
            }),
        );
    }
}

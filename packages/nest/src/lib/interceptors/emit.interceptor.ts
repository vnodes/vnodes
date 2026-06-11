import {
  Inject,
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { tap, type Observable } from 'rxjs';
import { MetadataService } from '../metadata/metadata.service.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmitInterceptor implements NestInterceptor {
  logger = new Logger(EmitInterceptor.name);
  constructor(
    @Inject(MetadataService)
    protected readonly metadataService: MetadataService,
    @Inject(EventEmitter2)
    protected readonly eventEmitterService: EventEmitter2,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const eventName = this.metadataService.getEventName(context);
    if (this.metadataService.isEmittedRequest(context)) {
      const req = context.switchToHttp().getRequest();
      console.table(req.body);
      this.eventEmitterService.emit(eventName, req.body);
    }
    return next.handle().pipe(
      tap((payload) => {
        if (this.metadataService.isEmittedResponse(context)) {
          console.table(payload);
          this.eventEmitterService.emit(eventName, payload);
        }
      }),
    );
  }
}

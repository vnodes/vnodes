import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { SessionController } from './session.controller.js';
import { SessionService } from './session.service.js';
import { SessionQueryService } from './session-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['session'])],
    controllers: [SessionController],
    providers: [SessionService, SessionQueryService],
    exports: [SessionService]
})
export class SessionModule {}
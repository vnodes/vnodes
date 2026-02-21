import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { HookController } from './hook.controller.js';
import { HookService } from './hook.service.js';
import { HookQueryService } from './hook-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['hook'])],
    controllers: [HookController],
    providers: [HookService, HookQueryService],
    exports: [HookService],
})
export class HookModule {}

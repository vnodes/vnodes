import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { AuditController } from './audit.controller.js';
import { AuditService } from './audit.service.js';
import { AuditQueryService } from './audit-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['audit'])],
    controllers: [AuditController],
    providers: [AuditService, AuditQueryService],
    exports: [AuditService]
})
export class AuditModule {}
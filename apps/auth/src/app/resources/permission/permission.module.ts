import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { PermissionController } from './permission.controller.js';
import { PermissionService } from './permission.service.js';
import { PermissionQueryService } from './permission-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['permission'])],
    controllers: [PermissionController],
    providers: [PermissionService, PermissionQueryService],
    exports: [PermissionService],
})
export class PermissionModule {}

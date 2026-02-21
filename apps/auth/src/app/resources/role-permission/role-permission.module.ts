import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { RolePermissionController } from './role-permission.controller.js';
import { RolePermissionService } from './role-permission.service.js';
import { RolePermissionQueryService } from './role-permission-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['rolePermission'])],
    controllers: [RolePermissionController],
    providers: [RolePermissionService, RolePermissionQueryService],
    exports: [RolePermissionService]
})
export class RolePermissionModule {}
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { AccessTokenPermissionController } from './access-token-permission.controller.js';
import { AccessTokenPermissionService } from './access-token-permission.service.js';
import { AccessTokenPermissionQueryService } from './access-token-permission-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['accessTokenPermission'])],
    controllers: [AccessTokenPermissionController],
    providers: [AccessTokenPermissionService, AccessTokenPermissionQueryService],
    exports: [AccessTokenPermissionService],
})
export class AccessTokenPermissionModule {}

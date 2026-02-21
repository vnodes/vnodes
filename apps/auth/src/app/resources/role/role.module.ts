import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { RoleController } from './role.controller.js';
import { RoleService } from './role.service.js';
import { RoleQueryService } from './role-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['role'])],
    controllers: [RoleController],
    providers: [RoleService, RoleQueryService],
    exports: [RoleService],
})
export class RoleModule {}

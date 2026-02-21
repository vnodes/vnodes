import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { UserRoleController } from './user-role.controller.js';
import { UserRoleService } from './user-role.service.js';
import { UserRoleQueryService } from './user-role-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['userRole'])],
    controllers: [UserRoleController],
    providers: [UserRoleService, UserRoleQueryService],
    exports: [UserRoleService]
})
export class UserRoleModule {}
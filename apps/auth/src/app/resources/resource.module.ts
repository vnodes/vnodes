import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '../prisma/client.js';
import { PermissionModule } from './permission/permission.module.js';
import { RoleModule } from './role/role.module.js';
import { RolePermissionModule } from './role-permission/role-permission.module.js';
import { UserModule } from './user/user.module.js';
import { UserRoleModule } from './user-role/user-role.module.js';

@Module({
    imports: [
        PrismaModule.forRoot(PrismaClient, []),
        UserModule,
        RoleModule,
        PermissionModule,
        RolePermissionModule,
        UserRoleModule,
    ],
})
export class ResourceModule {}

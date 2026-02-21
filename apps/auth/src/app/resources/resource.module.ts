import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '../prisma/client.js';
import { UserModule } from './user/user.module.js'
import { RoleModule } from './role/role.module.js'
import { PermissionModule } from './permission/permission.module.js'
import { RolePermissionModule } from './role-permission/role-permission.module.js'
import { UserRoleModule } from './user-role/user-role.module.js'
import { SessionModule } from './session/session.module.js'
import { AccessTokenModule } from './access-token/access-token.module.js'
import { AccessTokenPermissionModule } from './access-token-permission/access-token-permission.module.js'
import { HookModule } from './hook/hook.module.js'
import { AuditModule } from './audit/audit.module.js'

@Module({
    imports: [PrismaModule.forRoot(PrismaClient, []), UserModule,RoleModule,PermissionModule,RolePermissionModule,UserRoleModule,SessionModule,AccessTokenModule,AccessTokenPermissionModule,HookModule,AuditModule],
})
export class ResourceModule {}
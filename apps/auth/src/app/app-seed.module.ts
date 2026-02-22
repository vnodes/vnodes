import { Module, type OnModuleInit } from '@nestjs/common';
import { hash } from '@vnodes/crypto';
import { InjectDelegate, PrismaModule } from '@vnodes/prisma';
import type { Prisma } from './prisma/client.js';

@Module({
    imports: [PrismaModule.forFeature(['user', 'role', 'permission', 'rolePermission', 'userRole'])],
})
export class AppSeedModule implements OnModuleInit {
    constructor(
        @InjectDelegate('user') protected readonly userRepo: Prisma.UserDelegate,
        @InjectDelegate('role') protected readonly roleRepo: Prisma.RoleDelegate,
        @InjectDelegate('userRole') protected readonly userRoleRepo: Prisma.UserRoleDelegate,
        @InjectDelegate('permission') protected readonly permissionRepo: Prisma.PermissionDelegate,
        @InjectDelegate('rolePermission') protected readonly rolePermissionRepo: Prisma.RolePermissionDelegate,
    ) {}

    async createAdminPermission() {
        const found = await this.permissionRepo.findFirst({
            where: { scope: 'all', resource: 'all', operation: 'all' },
        });

        if (!found) {
            return await this.permissionRepo.create({
                data: { scope: 'all', resource: 'all', operation: 'all' },
            });
        }
        return found;
    }

    async createAdminRole() {
        const roleName = 'admin';
        const found = await this.roleRepo.findFirst({ where: { name: { equals: roleName, mode: 'insensitive' } } });
        if (!found) {
            return await this.roleRepo.create({ data: { name: roleName } });
        }
        return found;
    }

    async createRolePermissionMap(roleId: number, permissionId: number) {
        const found = await this.rolePermissionRepo.findFirst({ where: { roleId, permissionId } });

        if (!found) {
            return await this.rolePermissionRepo.create({ data: { roleId, permissionId } });
        }
        return found;
    }

    async createAdminUser() {
        const username = 'admin@org.com';
        const found = await this.userRepo.findFirst({ where: { username } });

        if (!found) {
            return await this.userRepo.create({
                data: { username, password: await hash('!Password123.'), firstName: 'admin', lastName: 'admin' },
            });
        }
        return found;
    }

    async createUserRole(userId: number, roleId: number) {
        const found = await this.userRoleRepo.findFirst({ where: { userId, roleId } });

        if (!found) {
            return await this.userRoleRepo.create({ data: { userId, roleId } });
        }
        return found;
    }

    async onModuleInit() {
        const permission = await this.createAdminPermission();
        const role = await this.createAdminRole();
        await this.createRolePermissionMap(role.id, permission.id);
        const user = await this.createAdminUser();
        await this.createUserRole(user.id, role.id);
    }
}

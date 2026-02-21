import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '@vnodes/crypto';
import { InjectDelegate } from '@vnodes/prisma';
import type { Prisma } from '../prisma/client.js';
import type { LoginDto } from './dto/login.dto.js';
@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtService) protected readonly jwtService: JwtService,
        @InjectDelegate('user') protected readonly userRepo: Prisma.UserDelegate,
        @InjectDelegate('role') protected readonly roleRepo: Prisma.RoleDelegate,
        @InjectDelegate('userRole') protected readonly userRoleRepo: Prisma.UserRoleDelegate,
        @InjectDelegate('permission') protected readonly permissionRepo: Prisma.PermissionDelegate,
    ) {}

    protected async findByUsername(username: string) {
        return await this.userRepo.findUnique({ where: { username }, include: { userRoles: true } });
    }

    protected async findByUsernameOrThrow(username: string) {
        const found = await this.findByUsername(username);
        if (!found) throw new NotFoundException();
        return found;
    }

    async login(body: LoginDto) {
        const found = await this.findByUsernameOrThrow(body.username);

        const isCorrectPassword = await compare(body.password, found.password);

        if (isCorrectPassword) {
            return this.jwtService;
        }
        return {};
    }

    logout(sessionId: number) {
        return {};
    }
}

import { randomInt } from 'node:crypto';
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from '@vnodes/crypto';
import { InjectDelegate } from '@vnodes/prisma';
import type { Prisma } from '../prisma/client.js';
import type { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { JwtPayloadDto } from './dto/jwt-payload.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import type { LoginWithOptDto } from './dto/login-with-otp.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtService) protected readonly jwtService: JwtService,
        @InjectDelegate('user') protected readonly userRepo: Prisma.UserDelegate,
        @InjectDelegate('role') protected readonly roleRepo: Prisma.RoleDelegate,
        @InjectDelegate('userRole') protected readonly userRoleRepo: Prisma.UserRoleDelegate,
        @InjectDelegate('permission') protected readonly permissionRepo: Prisma.PermissionDelegate,
        @InjectDelegate('session') protected readonly sessionRepo: Prisma.SessionDelegate,
    ) {}

    protected async createSession(
        user: Awaited<ReturnType<AuthService['findByUsernameOrThrow']>>,
        deviceId?: string,
        ipAddress?: string,
    ) {
        const newSession = await this.sessionRepo.create({
            data: { userId: user.id, token: 'not set', deviceId, ipAddress },
        });
        const jwtPayload = this.createJwtPayload(newSession.id, user);
        const signedToken = await this.jwtService.signAsync(jwtPayload);

        await this.sessionRepo.update({ where: { id: newSession.id }, data: { token: await hash(signedToken) } });
        return { token: signedToken };
    }

    protected async createJwtPayload(
        sessionId: number,
        userData: Awaited<ReturnType<AuthService['findByUsernameOrThrow']>>,
    ) {
        const jwtPayload = new JwtPayloadDto();
        jwtPayload.sub = sessionId;
        jwtPayload.permissions = userData.userRoles.flatMap((r) =>
            r.role.rolePermissions.map((rp) => {
                return rp.permissionId;
            }),
        );

        return jwtPayload;
    }

    protected async findByUsername(username: string) {
        return await this.userRepo.findUnique({
            where: { username },
            include: {
                userRoles: { include: { role: { include: { rolePermissions: { include: { permission: true } } } } } },
            },
        });
    }

    protected async findByUsernameOrThrow(username: string) {
        const found = await this.findByUsername(username);
        if (!found) throw new NotFoundException();
        return found;
    }

    async login(body: LoginDto, deviceId?: string, ipAddress?: string) {
        const found = await this.findByUsernameOrThrow(body.username);
        const isPasswordMatch = await compare(body.password, found.password);

        if (isPasswordMatch) {
            return await this.createSession(found, deviceId, ipAddress);
        }
        throw new UnauthorizedException('wrong password');
    }

    async loginWithOptDto(body: LoginWithOptDto, deviceId?: string, ipAddress?: string) {
        const found = await this.findByUsernameOrThrow(body.username);

        if (found.otp) {
            const isOptMatch = await compare(body.opt, found.otp);

            if (isOptMatch) {
                return await this.createSession(found, deviceId, ipAddress);
            }
        }

        throw new UnauthorizedException('wrong otp');
    }

    async forgotPassword(body: ForgotPasswordDto, _deviceId?: string, _ipAddress?: string) {
        await this.userRepo.update({
            where: { username: body.username },
            data: { otp: await hash(randomInt(100000, 999999).toString()) },
        });

        return { message: 'One time password is sent to your email address' };
    }

    async logoutFromAll(sessionId: number) {
        const foundSession = await this.sessionRepo.findUnique({ where: { id: sessionId } });

        if (!foundSession) {
            throw new UnauthorizedException('Invalid session');
        }

        const foundSessions = await this.sessionRepo.findMany({ where: { userId: foundSession.userId } });

        await this.sessionRepo.deleteMany({
            where: {
                id: {
                    in: foundSessions.map((e) => e.id),
                },
            },
        });

        return {
            message: 'See you later',
        };
    }

    async logout(sessionId: number) {
        const found = await this.sessionRepo.findUnique({ where: { id: sessionId } });

        if (found) {
            await this.sessionRepo.update({ where: { id: sessionId }, data: { deletedAt: new Date() } });
            return { message: 'See you later' };
        }
        throw new NotFoundException(`Session  not found!`);
    }
}

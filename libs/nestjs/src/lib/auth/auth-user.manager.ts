import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../crypto/hash.js';

export class JwtPayload {
    sub: number;
    username: string;
    version: string;
}

export class AuthUser {
    id: number;
    version: string;
    username: string;
    password: string;
    permissions?: string;
    roles?: string;
}

export class AuthUserManager {
    constructor(
        protected readonly user: AuthUser,
        protected readonly jwt: JwtService,
    ) {}

    protected get permisisons() {
        return this.user.permissions ? this.user.permissions.split(',') : [];
    }

    protected get roles() {
        return this.user.roles ? this.user.roles.split(',') : [];
    }

    private get version() {
        return this.user.version;
    }

    isAdmin() {
        if (this.user.roles) {
            return /\badmin\b/i.test(this.user.roles);
        }
        return false;
    }
    hasPermissions(requiredPermissions: string) {
        const items = requiredPermissions.split(',');
        for (const subject of items) {
            if (!this.permisisons.includes(subject)) {
                throw new ForbiddenException('Insufficient permissions');
            }
        }
        return true;
    }

    hasRoles(requiredRoles: string) {
        const items = requiredRoles.split(',');
        for (const subject of items) {
            if (!this.roles.includes(subject)) {
                throw new ForbiddenException('Insufficient roles');
            }
        }
        return true;
    }

    toJwtPayload(): JwtPayload {
        return {
            sub: this.user.id,
            username: this.user.username,
            version: this.user.version,
        };
    }

    async verifyPassword(password: string) {
        if (await compare(password, this.user.password)) {
            return true;
        }
        throw new UnauthorizedException(`Wrong password`);
    }

    async signToken() {
        const token = await this.jwt.signAsync(this.toJwtPayload());
        return token;
    }

    async verifyToken(jwtToken: string) {
        const jwtPayload = await this.jwt.verifyAsync<JwtPayload>(jwtToken);

        if (jwtPayload.version === this.version) {
            return jwtPayload;
        }

        throw new UnauthorizedException(`Invalid jwt version`);
    }
}

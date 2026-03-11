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
        const arr = this.user.permissions ? this.user.permissions.split(',') : [];
        return new Set<string>(arr);
    }

    protected get roles() {
        const arr = this.user.roles ? this.user.roles.split(',') : [];
        return new Set<string>(arr);
    }

    private get version() {
        return this.user.version;
    }

    isAdmin() {
        return this.roles.has('Admin');
    }

    hasPermissions(requiredPermissions: string[]) {
        if (requiredPermissions.every((permission) => this.permisisons.has(permission))) {
            return true;
        }
        throw new ForbiddenException('Insufficient permissions');
    }

    hasRoles(requiredRoles: string[]) {
        if (requiredRoles.some((role) => this.roles.has(role))) {
            return true;
        }
        throw new ForbiddenException('Insufficient role');
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

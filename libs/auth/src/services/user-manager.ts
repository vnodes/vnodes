import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '@vnodes/crypto';

export class JwtPayload {
    sub: number;
    username: string;
    version: string;
}

export class User {
    id: number;
    version: string;
    username: string;
    password: string;
    permissions?: string[];
    roles?: string[];

    constructor(user: User) {
        Object.assign(this, user);

        if (user.permissions && user.permissions?.length > 0) {
            this.permissions = user.permissions;
        }

        if (user.roles && user.roles?.length > 0) {
            this.roles = user.roles;
        }
    }
}

export class UserManager {
    constructor(
        protected readonly userData: User,
        protected readonly jwt: JwtService,
    ) {}

    get user(): User {
        return new User(this.userData);
    }

    get permisisons() {
        return new Set<string>(this.userData.permissions ?? []);
    }

    get roles() {
        return new Set<string>(this.userData.roles ?? []);
    }

    get version() {
        return this.userData.version;
    }

    isAdmin() {
        return this.roles.has('admin');
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
            sub: this.userData.id,
            username: this.userData.username,
            version: this.userData.version,
        };
    }

    async comparePassword(password: string) {
        if (await compare(password, this.userData.password)) {
            return true;
        }
        throw new UnauthorizedException(`Wrong password`);
    }

    async signToken() {
        const token = await this.jwt.signAsync(this.toJwtPayload());
        return token;
    }

    async verifyToken(token: string) {
        const jwtPayload = await this.jwt.verifyAsync<JwtPayload>(token);

        if (jwtPayload.version === this.version) {
            return jwtPayload;
        }

        throw new UnauthorizedException(`Invalid jwt version`);
    }
}

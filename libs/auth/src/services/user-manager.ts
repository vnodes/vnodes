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

    /**
     * Get the user data
     */
    get user(): User {
        return new User(this.userData);
    }

    /**
     * Get the set of user permissions
     */
    get permisisons() {
        return new Set<string>(this.userData.permissions ?? []);
    }

    /**
     * Get the set of user roles
     */
    get roles() {
        return new Set<string>(this.userData.roles ?? []);
    }

    /**
     * Get the user version
     */
    get version() {
        return this.userData.version;
    }

    /**
     * Check the user has the "admin" role
     */
    isAdmin() {
        return this.roles.has('admin');
    }

    /**
     * Check the user has all {@link requiredPermissions} or throw {@link ForbiddenException}
     */
    hasPermissions(requiredPermissions: string[]) {
        if (requiredPermissions.every((permission) => this.permisisons.has(permission))) {
            return true;
        }
        throw new ForbiddenException('Insufficient permissions');
    }

    /**
     * Check the user has one of the {@link requiredRoles} or throw {@link ForbiddenException}
     */
    hasRoles(requiredRoles: string[]) {
        if (requiredRoles.some((role) => this.roles.has(role))) {
            return true;
        }
        throw new ForbiddenException('Insufficient role');
    }

    /**
     * Create the jwt payload object {@link JwtPayload}
     * @returns -- {@link JwtPayload}
     */
    toJwtPayload(): JwtPayload {
        return {
            sub: this.userData.id,
            username: this.userData.username,
            version: this.userData.version,
        };
    }

    /**
     * Compare the plain password with the hashed password
     * @param password plain password
     * @returns boolean or throw {@link UnauthorizedException}
     */
    async comparePassword(password: string) {
        if (await compare(password, this.userData.password)) {
            return true;
        }
        throw new UnauthorizedException(`Wrong password`);
    }

    /**
     * Sign the jwt token
     * @returns jwt token
     */
    async signToken() {
        const token = await this.jwt.signAsync(this.toJwtPayload());
        return token;
    }

    /**
     * Verify jwt {@link token}
     * @param token jwt token
     * @returns string or throw {@link UnauthorizedException} that indicated invalid or old versioned token
     */
    async verifyToken(token: string) {
        const jwtPayload = await this.jwt.verifyAsync<JwtPayload>(token);

        if (jwtPayload.version === this.version) {
            return jwtPayload;
        }

        throw new UnauthorizedException(`Invalid jwt version`);
    }
}

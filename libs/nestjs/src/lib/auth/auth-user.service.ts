import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type AuthUser, AuthUserManager, type JwtPayload } from './auth-user.manager.js';

export enum AuthUserEvent {
    /**
     * Emit this event with the payload {@link AuthUser} when user is created
     */
    USER_CREATE = 'user.create',
    /**
     * Emit this event with the payload {@link AuthUser} when user is updated
     */
    USER_UPDATE = 'user.update',

    /**
     * Emit this event with the payload username (string) when user is deleted
     */
    USER_DELETE = 'user.delete',

    /**
     * Emit this event with the payload, {@link AuthUser}[] to update the cache
     */
    MODULE_INIT = 'module.init',

    /**
     * This event is emitted when a user logins
     */
    LOGIN = 'LOGIN',
}

@Injectable()
export class AuthUserService {
    protected readonly users = new Map<string, AuthUser>();
    protected readonly usersToken = new Map<string, string>();

    constructor(@Inject(JwtService) protected readonly jwt: JwtService) {}

    updateUser(user: AuthUser) {
        this.users.set(user.username, user);
    }

    deleteUser(username: string) {
        this.users.delete(username);
    }

    load(authUsers: AuthUser[]) {
        this.users.clear();
        for (const user of authUsers) {
            this.users.set(user.username, user);
        }
    }

    findByUsername(username: string) {
        const foundUser = this.users.get(username);
        if (foundUser) {
            return new AuthUserManager(foundUser, this.jwt);
        }
        throw new NotFoundException(`The user ${username} not found`);
    }

    async findByToken(token: string) {
        const found = this.usersToken.get(token);

        if (found) {
            return this.findByUsername(found);
        } else {
            const verified = await this.jwt.verifyAsync<JwtPayload>(token);
            return this.findByUsername(verified.username);
        }
    }

    /**
     * Create the authorization token (jwt)
     *
     * @param username
     * @param password
     * @returns
     */
    async login(username: string, password: string) {
        const found = this.findByUsername(username);
        await found.verifyPassword(password);
        const token = await found.signToken();
        this.usersToken.set(token, username);
        return token;
    }
}

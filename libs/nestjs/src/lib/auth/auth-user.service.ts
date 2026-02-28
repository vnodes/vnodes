import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { type AuthUser, AuthUserManager } from './auth-user.manager.js';

export enum AuthUserEvent {
    USER_CREATE = 'user.create',
    USER_UPDATE = 'user.update',
    USER_DELETE = 'user.delete',

    MODULE_INIT = 'module.init',

    /**
     * Login event
     */
    LOGIN = 'LOGIN',
}

@Injectable()
export class AuthUserService {
    protected readonly users = new Map<string, AuthUser>();

    constructor(
        @Inject(JwtService) protected readonly jwt: JwtService,
        @Inject(EventEmitter2) protected readonly event: EventEmitter2,
    ) {}

    @OnEvent(AuthUserEvent.USER_UPDATE)
    @OnEvent(AuthUserEvent.USER_CREATE)
    updateUser(user: AuthUser) {
        this.users.set(user.username, user);
    }

    @OnEvent(AuthUserEvent.USER_DELETE)
    deleteUser(username: string) {
        this.users.delete(username);
    }

    @OnEvent(AuthUserEvent.MODULE_INIT)
    loadUsersOnModuleInit(authUsers: AuthUser[]) {
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
        this.event.emit(AuthUserEvent.LOGIN, { username });
        return token;
    }
}

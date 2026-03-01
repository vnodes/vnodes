import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthUser } from './auth-user.manager.js';
import { AuthUserEvent, AuthUserService } from './auth-user.service.js';

@Injectable()
export class AuthEventService {
    constructor(protected readonly authUserService: AuthUserService) {}

    @OnEvent(AuthUserEvent.MODULE_INIT)
    loadUsers(users: AuthUser[]) {
        this.authUserService.load(users);
    }

    @OnEvent(AuthUserEvent.USER_UPDATE)
    @OnEvent(AuthUserEvent.USER_CREATE)
    updateUser(user: AuthUser) {
        this.authUserService.updateUser(user);
    }

    @OnEvent(AuthUserEvent.USER_DELETE)
    deleteUser(username: string) {
        this.authUserService.deleteUser(username);
    }
}

import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { otp } from '@vnodes/crypto';
import { User, UserManager } from './user-manager.js';

@Injectable()
export class UserService {
    protected readonly usernameMap = new Map<string, User>();
    protected readonly tokenUsernameMap = new Map<string, string>();
    protected readonly usernameOtpMap = new Map<string, string>();

    constructor(@Inject(JwtService) protected readonly jwt: JwtService) {}

    update(user: User) {
        this.usernameMap.set(user.username, user);
    }

    deleteByUsername(username: string) {
        this.usernameMap.delete(username);
    }

    load(users: User[]) {
        this.usernameMap.clear();
        for (const user of users) {
            this.usernameMap.set(user.username, user);
        }
    }

    findByUsername(username: string) {
        const foundUser = this.usernameMap.get(username);
        if (foundUser) {
            return new UserManager(foundUser, this.jwt);
        }
        throw new NotFoundException(`The user ${username} not found`);
    }

    findByToken(token: string) {
        const username = this.tokenUsernameMap.get(token);
        if (username) {
            return this.findByUsername(username);
        }

        throw new UnauthorizedException(`User not found by token`);
    }

    deleteToken(token: string) {
        if (this.tokenUsernameMap.delete(token)) {
            return true;
        }
        throw new NotFoundException('Token not found');
    }

    updateToken(token: string, username: string) {
        this.tokenUsernameMap.set(token, username);
    }

    createOtp(username: string) {
        const otpValue = otp();
        this.usernameOtpMap.set(username, otpValue);
        return otpValue;
    }

    compareOtp(username: string, otp: string) {
        const foundOtp = this.usernameOtpMap.get(username);
        if (foundOtp) {
            if (foundOtp === otp) {
                return true;
            }
            throw new UnauthorizedException(`Wrong otp`);
        } else {
            throw new UnauthorizedException('Otp not found');
        }
    }

    deleteOtp(username: string) {
        this.usernameOtpMap.delete(username);
    }
}

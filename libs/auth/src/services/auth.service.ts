import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccessTokenDto } from 'src/dto/access-token.dto.js';
import { ForgotPasswordDto } from 'src/dto/forgot-password.dto.js';
import { LoginDto } from 'src/dto/login.dto.js';
import { LoginWithOtpDto } from 'src/dto/login-with-otp.dto.js';
import { MessageDto } from 'src/dto/message.dto.js';
import { OtpResponseDto } from 'src/dto/otp-response-dto.js';
import { UserService } from './user.service.js';

@Injectable()
export class AuthService {
    constructor(
        protected readonly userService: UserService,
        protected readonly eventEmitter: EventEmitter2,
    ) {}

    /**
     * Login with credentials (find user by username and compare the passed with hashed password)
     * @param body -- {@link LoginDto}
     * @returns -- {@link AccessTokenDto}
     */
    async login(body: LoginDto) {
        const user = this.userService.findByUsername(body.username);
        await user.comparePassword(body.password);
        const token = await user.signToken();
        this.userService.updateToken(token, user.user.username);
        return new AccessTokenDto({ token });
    }

    /**
     * Login with otp code (generated and sent to the user via email or sms)
     * @param body -- {@link LoginWithOtpDto}
     * @returns -- {@link AccessTokenDto}
     */
    async loginWithOtp(body: LoginWithOtpDto) {
        this.userService.compareOtp(body.username, body.otp);
        this.userService.deleteOtp(body.username);
        const user = this.userService.findByUsername(body.username);
        const token = await user.signToken();
        return new AccessTokenDto({ token });
    }

    /**
     * Logout from the current sesison (delete the session token from token hash map)
     * @param token acesss token
     * @returns -- {@link MessageDto}
     */
    logout(token: string) {
        this.userService.deleteToken(token);
        return new MessageDto({ message: 'Bye for now' });
    }

    /**
     * Create a otp code and emit "email.otp" event with payload of {@link OtpResponseDto}
     * @param body -- {@link ForgotPasswordDto}
     * @returns -- {@link MessageDto}
     */
    forgotPassword(body: ForgotPasswordDto) {
        const otp = this.userService.createOtp(body.username);
        this.eventEmitter.emit('email.otp', new OtpResponseDto({ otp }));
        return new MessageDto({ message: 'We sent the otp to your email' });
    }
}

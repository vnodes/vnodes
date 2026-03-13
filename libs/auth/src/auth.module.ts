import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './services/auth.service.js';
import { UserService } from './services/user.service.js';

@Module({
    imports: [
        EventEmitterModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                const secret = config.getOrThrow('JWT_SECRET');
                const expiresIn = config.getOrThrow('JWT_EXPIRES_IN');
                return {
                    secret,
                    signOptions: {
                        expiresIn,
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [UserService, AuthService],
})
export class AuthModule {}

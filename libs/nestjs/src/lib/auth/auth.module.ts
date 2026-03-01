import { randomUUID } from 'node:crypto';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { Env } from '../const/env.js';
import { AuthEventService } from './auth-event.service.js';
import { AuthUserService } from './auth-user.service.js';

@Module({
    imports: [
        EventEmitterModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                const secret = config.get(Env.JWT_SECRET, randomUUID());
                const expiresIn = config.get(Env.JWT_EXPIRES_IN, '1u');
                return {
                    secret,
                    signOptions: {
                        expiresIn,
                    },
                };
            },
        }),
    ],
    providers: [AuthUserService, AuthEventService],
})
export class AuthModule {}

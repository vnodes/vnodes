import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@vnodes/prisma';
import { AuthService } from './auth.service.js';

@Module({
    imports: [
        ConfigModule,
        PrismaModule.forFeature(['user', 'role', 'userRole', 'permission', 'session', 'accessToken']),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                const secret = config.getOrThrow('JWT_SECRET');
                return {
                    secret,
                    signOptions: {
                        expiresIn: '1y',
                    },
                };
            },
        }),
    ],
    providers: [AuthService],
})
export class AuthModule {}

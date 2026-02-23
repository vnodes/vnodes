import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { OtpController } from './otp.controller.js';
import { OtpService } from './otp.service.js';
import { OtpQueryService } from './otp-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['otp'])],
    controllers: [OtpController],
    providers: [OtpService, OtpQueryService],
    exports: [OtpService],
})
export class OtpModule {}

import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { EmailController } from './email.controller.js';
import { EmailService } from './email.service.js';

@Module({
    imports: [PrismaModule.forFeature(['email'])],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}

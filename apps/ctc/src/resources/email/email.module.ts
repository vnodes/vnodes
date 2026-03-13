
import { Module } from '@vnodes/core/common';
import { PrismaModule } from '@vnodes/core/prisma';
import { EmailController } from './email.controller.js';
import { EmailService } from './email.service.js';

@Module({
    imports: [PrismaModule.forFeature(['email'])],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}

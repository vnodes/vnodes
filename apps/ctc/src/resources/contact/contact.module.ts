import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

@Module({
    imports: [PrismaModule.forFeature(['contact'])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}

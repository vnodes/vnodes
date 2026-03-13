
import { Module } from '@vnodes/core/common';
import { PrismaModule } from '@vnodes/core/prisma';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

@Module({
    imports: [PrismaModule.forFeature(['contact'])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}

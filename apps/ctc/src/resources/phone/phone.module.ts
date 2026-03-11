import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { PhoneController } from './phone.controller.js';
import { PhoneService } from './phone.service.js';

@Module({
    imports: [PrismaModule.forFeature(['phone'])],
    controllers: [PhoneController],
    providers: [PhoneService],
})
export class PhoneModule {}

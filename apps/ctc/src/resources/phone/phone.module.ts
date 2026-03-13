
import { Module } from '@vnodes/core/common';
import { PrismaModule } from '@vnodes/core/prisma';
import { PhoneController } from './phone.controller.js';
import { PhoneService } from './phone.service.js';

@Module({
    imports: [PrismaModule.forFeature(['phone'])],
    controllers: [PhoneController],
    providers: [PhoneService],
})
export class PhoneModule {}

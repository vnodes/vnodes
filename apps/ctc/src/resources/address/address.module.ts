
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { AddressController } from './address.controller.js';
import { AddressService } from './address.service.js';

@Module({
    imports: [PrismaModule.forFeature(['address'])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}


import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ContactModule } from './contact/contact.module.js'
import { EmailModule } from './email/email.module.js'
import { PhoneModule } from './phone/phone.module.js'
import { AddressModule } from './address/address.module.js'
import { PrismaClient } from './prisma/index.js';

@Module({
    imports: [PrismaModule.forRoot(PrismaClient, []), ContactModule,EmailModule,PhoneModule,AddressModule],
})
export class ResourceModule {}


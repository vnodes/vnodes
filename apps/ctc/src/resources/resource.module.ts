import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ContactModule } from './contact/contract.module.js';
import { PrismaClient } from './prisma/index.js';

@Module({
    imports: [PrismaModule.forRoot(PrismaClient, []), ContactModule],
})
export class ResourceModule {}

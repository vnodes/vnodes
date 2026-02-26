import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '../prisma/client.js';

@Module({
    imports: [PrismaModule.forRoot(PrismaClient, [])],
})
export class ResourceModule {}

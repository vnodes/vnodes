import { Module } from '@vnodes/nestjs/common';
import { ConfigModule } from '@vnodes/nestjs/config';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '@vnodes/sample-db/client';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.forRoot({ client: PrismaClient })],
})
export class AppModule {}

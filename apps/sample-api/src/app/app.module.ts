import { PrismaClient } from '@vnodes/dbs/pms';
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { RootModule } from '@vnodes/nestjs/root';
import { AppController } from './app.controller.js';
import { ProjectModule } from './project/project.module.js';

@Module({
    imports: [RootModule, PrismaModule.forRoot(PrismaClient, []), ProjectModule],
    controllers: [AppController],
})
export class AppModule {}

import { Prisma } from '@vnodes/dbs/pms';
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ProjectController } from './project.controller.js';

@Module({
    imports: [PrismaModule.forFeature<Lowercase<Prisma.ModelName>>(['project'])],
    controllers: [ProjectController],
})
export class ProjectModule {}

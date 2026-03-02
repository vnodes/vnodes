import { Prisma } from '@vnodes/dbs/pms';
import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { ProjectController } from './project.controller.js';
import { ProjectService } from './project.service.js';

@Module({
    imports: [PrismaModule.forFeature<Lowercase<Prisma.ModelName>>(['project'])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}

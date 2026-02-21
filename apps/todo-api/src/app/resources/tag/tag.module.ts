import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { TagController } from './tag.controller.js';
import { TagService } from './tag.service.js';
import { TagQueryService } from './tag-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['tag'])],
    controllers: [TagController],
    providers: [TagService, TagQueryService],
    exports: [TagService]
})
export class TagModule {}
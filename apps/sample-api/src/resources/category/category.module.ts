import { Module } from '@vnodes/nestjs/common';
import { PrismaModule } from '@vnodes/nestjs/prisma';
import { CategoryController } from './category.controller.js';
import { CategoryService } from './category.service.js';

@Module({
    imports: [PrismaModule.forFeature({ models: ['category'] })],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}

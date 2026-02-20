import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { TodoController } from './todo.controller.js';
import { TodoService } from './todo.service.js';
import { TodoQueryService } from './todo-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['todo'])],
    controllers: [TodoController],
    providers: [TodoService, TodoQueryService],
})
export class TodoModule {}

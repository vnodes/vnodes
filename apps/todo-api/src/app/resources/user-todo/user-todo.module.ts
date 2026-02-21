import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { UserTodoController } from './user-todo.controller.js';
import { UserTodoService } from './user-todo.service.js';
import { UserTodoQueryService } from './user-todo-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['userTodo'])],
    controllers: [UserTodoController],
    providers: [UserTodoService, UserTodoQueryService],
    exports: [UserTodoService],
})
export class UserTodoModule {}

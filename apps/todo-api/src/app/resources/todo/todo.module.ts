import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller.js';
import { Todo } from './todo.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodoController],
})
export class TodoModule {}

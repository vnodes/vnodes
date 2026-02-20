import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '../prisma/client.js';
import { TagModule } from './tag/tag.module.js';
import { TodoModule } from './todo/todo.module.js';
import { UserModule } from './user/user.module.js';
import { UserTodoModule } from './user-todo/user-todo.module.js';

@Module({
    imports: [PrismaModule.forRoot(PrismaClient, []), TagModule, TodoModule, UserModule, UserTodoModule],
})
export class ResourceModule {}

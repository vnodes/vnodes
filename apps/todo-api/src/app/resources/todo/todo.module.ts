import { Module } from "@nestjs/common";
import { PrismaModule } from "@vnodes/prisma";
import { ModelName } from "@vnodes/todo";
import { TodoController } from "./todo.controller.js";

@Module({
    imports: [PrismaModule.forFeature({ models: [ModelName.Todo] })],
    controllers: [TodoController],
})
export class TodoModule {}

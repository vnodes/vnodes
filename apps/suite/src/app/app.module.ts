import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrismaModule } from "@vnodes/prisma";
import { PrismaClient } from "@vnodes/todo";
import { AppController } from "./app.controller";
import { TodoModule } from "./resources/todo/todo.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
        }),
        EventEmitterModule.forRoot({ delimiter: "." }),
        PrismaModule.forRoot({ clientClass: PrismaClient }),
        TodoModule,
    ],
    controllers: [AppController],
})
export class AppModule {}

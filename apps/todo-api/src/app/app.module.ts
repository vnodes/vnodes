import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmExceptionFilter } from "./filters/typeorm-exception.filter.js";
import { Todo } from "./resources/todo/todo.entity.js";
import { TodoModule } from "./resources/todo/todo.module.js";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
        }),
        EventEmitterModule.forRoot({ delimiter: "." }),
        TypeOrmModule.forRoot({
            type: "postgres",
            port: 5432,
            host: "localhost",
            username: "admin",
            password: "password",
            database: "pms",
            entities: [Todo],
            synchronize: true,
            dropSchema: true,
            poolSize: 20,
        }),
        TodoModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: TypeOrmExceptionFilter,
        },
    ],
})
export class AppModule {}

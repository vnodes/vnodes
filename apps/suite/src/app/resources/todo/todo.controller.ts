import { Controller, Get } from "@nestjs/common";
import { InjectRepo } from "@vnodes/prisma";
import type { Prisma } from "@vnodes/todo";

@Controller("todos")
export class TodoController {
    constructor(@InjectRepo() protected readonly repo:Prisma.TodoDelegate){}

    @Get()
    find() {
        return this.repo.findMany();
    }
}

/** biome-ignore-all lint/style/useImportType: Nest */

import { Param, ParseIntPipe } from "@nestjs/common";
import { Body, Controller, ParamId, Query } from "@vnodes/nest";
import { InjectRepo } from "@vnodes/prisma";
import { Prisma, Status } from "@vnodes/todo";
import { TodoCreateDto, TodoQueryDto, TodoUpdateDto } from "./todo.js";

@Controller()
export class TodoController {
    constructor(@InjectRepo() protected readonly repo: Prisma.TodoDelegate) {}

    private toWhere(search?: string): Prisma.TodoWhereInput {
        if (search) {
            return {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                    { status: { equals: search as Status } },
                ],
            };
        }

        return {};
    }

    find(@Query() query: TodoQueryDto) {
        const { search, take, skip } = query;
        return this.repo.findMany({ take, skip, where: this.toWhere(search) });
    }

    findById(@Param("id", ParseIntPipe) id: number) {
        return this.repo.findUnique({ where: { id } });
    }

    create(@Body() data: TodoCreateDto) {
        return this.repo.create({ data });
    }

    update(@ParamId() id: number, @Body() data: TodoUpdateDto) {
        return this.repo.update({ where: { id }, data });
    }

    delete(@ParamId() id: number) {
        return this.repo.delete({ where: { id } });
    }
}

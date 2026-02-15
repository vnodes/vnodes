/** biome-ignore-all lint/style/useImportType: Nest */

import { InjectRepository } from '@nestjs/typeorm';
import { Body, Controller, type IController, ParamId, ParamRelationId, ParamRelationName, Query } from '@vnodes/nest';
import type { Repository } from 'typeorm';
import { Todo, TodoCreateDto, TodoQueryDto, TodoUpdateDto } from './todo.entity.js';

@Controller('todos', Todo)
export class TodoController implements IController {
    constructor(@InjectRepository(Todo) protected readonly repo: Repository<Todo>) {}

    find(@Query() query: TodoQueryDto) {
        return this.repo.find({ ...query });
    }

    findById(@ParamId() id: number) {
        return this.repo.findOneBy({ id });
    }

    create(@Body() data: TodoCreateDto) {
        return this.repo.save(data);
    }

    update(@ParamId() id: number, @Body() data: TodoUpdateDto) {
        return this.repo.update(id, data);
    }

    delete(@ParamId() id: number) {
        return this.repo.delete(id);
    }

    addRelation(
        @ParamId() id: number,
        @ParamRelationName() relationName: string,
        @ParamRelationId() relationId: number,
    ) {
        return this.repo.createQueryBuilder().relation(relationName).of(id).add(relationId);
    }

    removeRelation(
        @ParamId() id: number,
        @ParamRelationName() relationName: string,
        @ParamRelationId() relationId: number,
    ) {
        return this.repo.createQueryBuilder().relation(relationName).of(id).remove(relationId);
    }

    setRelation(
        @ParamId() id: number,
        @ParamRelationName() relationName: string,
        @ParamRelationId() relationId: number,
    ) {
        return this.repo.createQueryBuilder().relation(relationName).of(id).set(relationId);
    }

    unsetRelation(@ParamId() id: number, @ParamRelationName() relationName: string) {
        return this.repo.createQueryBuilder().relation(relationName).of(id).set(null);
    }
}

import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { HookCreateDto, HookQueryDto, HookReadDto, HookUpdateDto } from './dtos/index.js';
import { HookService } from './hook.service.js';

@Controller({
    createDto: HookCreateDto,
    updateDto: HookUpdateDto,
    queryDto: HookQueryDto,
    readDto: HookReadDto,
})
export class HookController implements ResourceOperations {
    constructor(@Inject(HookService) protected readonly service: HookService) {}

    find(query: HookQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: HookCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: HookUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}
import { Inject } from '@nestjs/common';
import { Controller, type ResourceOperations } from '@vnodes/nest';
import { TagCreateDto, TagQueryDto, TagReadDto, TagUpdateDto } from './dtos/index.js';
import { TagService } from './tag.service.js';

@Controller({
    createDto: TagCreateDto,
    updateDto: TagUpdateDto,
    queryDto: TagQueryDto,
    readDto: TagReadDto,
})
export class TagController implements ResourceOperations {
    constructor(@Inject(TagService) protected readonly service: TagService) {}

    find(query: TagQueryDto) {
        return this.service.find(query);
    }

    findById(id: number) {
        return this.service.findByIdOrThrow(id);
    }

    create(data: TagCreateDto) {
        return this.service.create(data);
    }

    update(id: number, data: TagUpdateDto) {
        return this.service.update(id, data);
    }

    delete(id: number) {
        return this.service.softDelete(id);
    }
}

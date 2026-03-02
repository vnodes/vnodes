import { CrudController, ResourceController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { ProjectCreateDto, ProjectQueryDto, ProjectReadDto, ProjectUpdateDto } from './project.dto.js';
import { ProjectService } from './project.service.js';

@CrudController({
    readDto: ProjectReadDto,
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto,
    queryDto: ProjectQueryDto,
})
export class ProjectController extends ResourceController<
    ProjectReadDto,
    ProjectCreateDto,
    ProjectUpdateDto,
    ProjectQueryDto
> {
    constructor(@Inject(ProjectService) service: ProjectService) {
        super(service);
    }
}

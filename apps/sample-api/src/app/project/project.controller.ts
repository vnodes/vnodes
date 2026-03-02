import { BaseProjectController } from '@vnodes/dbs/pms';
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { ProjectCreateDto, ProjectQueryDto, ProjectReadDto, ProjectUpdateDto } from './project.dto.js';
import { ProjectService } from './project.service.js';

@CrudController({
    readDto: () => ProjectReadDto,
    createDto: () => ProjectCreateDto,
    updateDto: () => ProjectUpdateDto,
    queryDto: () => ProjectQueryDto,
})
export class ProjectController extends BaseProjectController {
    constructor(@Inject(ProjectService) service: ProjectService) {
        super(service);
    }
}

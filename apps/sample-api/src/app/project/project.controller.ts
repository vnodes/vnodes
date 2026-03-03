import { BaseProjectController, QueryMany } from '@vnodes/dbs/pms';
import { CrudController } from '@vnodes/nestjs';
import { Inject } from '@vnodes/nestjs/common';
import { ProjectScalarFieldEnum } from 'node_modules/@vnodes/dbs/dist/pms/src/internal/prismaNamespace.js';
import { ProjectCreateDto, ProjectQueryDto, ProjectReadDto, ProjectUpdateDto } from './project.dto.js';
import { ProjectService } from './project.service.js';

@CrudController({
    readDto: ProjectReadDto,
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto,
    queryDto: ProjectQueryDto,
})
export class ProjectController extends BaseProjectController {
    constructor(@Inject(ProjectService) service: ProjectService) {
        super(service);
    }

    override findMany(query: QueryMany<ProjectScalarFieldEnum>): Promise<
        {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
        }[]
    > {
        console.table(query);
        return super.findMany(query);
    }
}

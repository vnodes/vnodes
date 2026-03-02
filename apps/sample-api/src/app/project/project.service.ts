import { Prisma, ProjectFindManyArgs } from '@vnodes/dbs/pms';
import { ResourceService } from '@vnodes/nestjs';
import { Injectable, NotFoundException } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { ProjectCreateDto, ProjectQueryDto, ProjectReadDto, ProjectUpdateDto } from './project.dto.js';

@Injectable()
export class ProjectService extends ResourceService<
    ProjectReadDto,
    ProjectCreateDto,
    ProjectUpdateDto,
    ProjectQueryDto
> {
    constructor(@InjectDelegate('project') protected readonly repo: Prisma.ProjectDelegate) {
        super();
    }

    protected toProjectFindManyArgs(query: ProjectQueryDto): ProjectFindManyArgs {
        return {
            take: query.take ?? 20,
            skip: query.skip ?? 0,
            orderBy: this.toOrderBy(query),
        };
    }

    override async findMany(query: ProjectQueryDto): Promise<ProjectReadDto[]> {
        const result = await this.repo.findMany();
        return result.map((item) => new ProjectReadDto(item));
    }

    override async findOneById(id: string): Promise<ProjectReadDto> {
        const result = await this.repo.findUnique({ where: { id: +id } });
        if (result) {
            return new ProjectReadDto(result);
        }
        throw new NotFoundException();
    }
    override async createOne(data: ProjectCreateDto): Promise<ProjectReadDto> {
        const result = await this.repo.create({ data });
        return new ProjectReadDto(result);
    }
    override async updateOneById(id: string, data: ProjectUpdateDto): Promise<ProjectReadDto> {
        const result = await this.repo.update({ where: { id: +id }, data });
        return new ProjectReadDto(result);
    }
    override async deleteOneById(id: string): Promise<ProjectReadDto> {
        const result = await this.repo.update({ where: { id: +id }, data: { deletedAt: new Date() } });
        return new ProjectReadDto(result);
    }
}

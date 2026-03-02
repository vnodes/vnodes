import { Prisma, Project, ProjectCreateInput } from '@vnodes/dbs/pms';
import { CrudController, Prop } from '@vnodes/nestjs';
import { InjectDelegate } from '@vnodes/nestjs/prisma';
import { PartialType } from '@vnodes/nestjs/swagger';

export class ProjectCreateDto implements ProjectCreateInput {
    @Prop() name: string;
}

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}

export class ProjectReadDto implements Project {
    @Prop() id: number;
    @Prop() createdAt: Date;
    @Prop() updatedAt: Date;
    @Prop() deletedAt: Date;
    @Prop() name: string;
    @Prop() description: string;
}

@CrudController({
    createDto: ProjectCreateDto,
    readDto: ProjectReadDto,
})
export class ProjectController {
    constructor(@InjectDelegate('project') protected readonly repo: Prisma.ProjectDelegate) {}

    findMany() {
        return this.repo.findMany();
    }

    findOneById(id: string) {
        return this.repo.findUnique({ where: { id: +id } });
    }

    createOne(data: ProjectCreateDto) {
        return this.repo.create({ data });
    }

    updateOneById(id: string, data: ProjectUpdateDto) {
        return this.repo.update({ where: { id: +id }, data });
    }

    deleteOneById(id: string) {
        return this.repo.delete({ where: { id: +id } });
    }
}

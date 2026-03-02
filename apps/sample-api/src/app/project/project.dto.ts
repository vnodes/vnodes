import { Prisma, Project, ProjectCreateInput, QueryMany } from '@vnodes/dbs/pms';
import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';

export class ProjectCreateDto implements ProjectCreateInput {
    @Prop({ required: true }) name: string;
}

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}

export class ProjectReadDto implements Project {
    @Prop() id: number;
    @Prop() name: string;
    @Prop() description: string | null;
    @Prop() createdAt: Date;
    @Prop() updatedAt: Date;
    @Prop() deletedAt: Date | null;
    constructor(data: Partial<ProjectReadDto>) {
        Object.assign(this, data);
    }
}

export class ProjectQueryDto implements Required<QueryMany<Prisma.ProjectScalarFieldEnum>> {
    @Prop() orderBy: Prisma.ProjectScalarFieldEnum;
    @Prop() orderDir: 'asc' | 'desc' = 'asc';
    @Prop() search: string;
    @Prop() skip = 0;
    @Prop() take = 20;
    @Prop() withDeleted = false;
}

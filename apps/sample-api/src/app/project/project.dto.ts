import { Prisma, Project, ProjectCreateInput, QueryMany } from '@vnodes/dbs/pms';
import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';

export class ProjectCreateDto implements ProjectCreateInput {
    @Prop({ required: true }) name: string;
}

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}

export class ProjectReadDto implements Project {
    @Prop() id: number;

    @Prop() uuid: string;
    @Prop() count: number | null;
    @Prop() counts: number[];
    @Prop() name: string;
    @Prop() description: string;
    @Prop() createdAt: Date;
    @Prop() updatedAt: Date;
    @Prop() deletedAt: Date;

    constructor(data: Partial<ProjectReadDto>) {
        Object.assign(this, data);
    }
}

export class ProjectQueryDto implements QueryMany<Prisma.ProjectScalarFieldEnum> {
    @Prop() orderBy?: Prisma.ProjectScalarFieldEnum;
    @Prop() orderDir?: 'asc' | 'desc';
    @Prop() search?: string;
    @Prop() skip?: number;
    @Prop() take?: number;
    @Prop() withDeleted?: boolean;
}

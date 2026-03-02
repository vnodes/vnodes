import { Project, ProjectCreateInput } from '@vnodes/dbs/pms';
import { Dto } from '@vnodes/nestjs';

@Dto()
export class ProjectCreateDto implements ProjectCreateInput {
    name: string;
}

@Dto()
export class ProjectUpdateDto extends ProjectCreateDto {}

@Dto()
export class ProjectReadDto implements Project {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    description: string | null;
    constructor(data: Partial<ProjectReadDto>) {
        Object.assign(this, data);
    }
}

@Dto()
export class ProjectQueryDto {
    orderBy: keyof ProjectReadDto;
    orderDir: 'asc' | 'desc' = 'asc';
    search: string;
    skip = 0;
    take = 20;
}

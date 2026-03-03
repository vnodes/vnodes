import { BaseProjectService, Prisma } from '@vnodes/dbs/pms';
import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/nestjs/prisma';

@Injectable()
export class ProjectService extends BaseProjectService {
    constructor(@InjectDelegate('project') repo: Prisma.ProjectDelegate) {
        super(repo);
    }
}

import { Prisma } from './client.js';
import { ProjectFindManyArgs, ProjectOrderByWithAggregationInput, ProjectSelect, ProjectWhereInput } from './models.js';

export class CommonQuery {
    take?: number;
    skip?: number;
    search?: string;
}

export class __ProjectOrderBy extends CommonQuery {
    orderBy?: Prisma.ProjectScalarFieldEnum;
    orderDir?: Prisma.SortOrder;
}

export class ProjectQuery extends __ProjectOrderBy {}

export class ProjectService {
    constructor(protected readonly repo: Prisma.ProjectDelegate) {}

    protected toProjection(): ProjectSelect | undefined {
        return undefined;
    }

    protected toPagination(
        query: Pick<ProjectQuery, 'take' | 'skip'>,
    ): Pick<ProjectFindManyArgs, 'take' | 'skip'> | undefined {
        if (query.take || query.skip) {
            return {
                take: query.take ?? undefined,
                skip: query.skip ?? undefined,
            };
        }
        return undefined;
    }

    protected toWhere(search?: string): ProjectWhereInput | undefined {
        if (search) {
            const query = [Prisma.ProjectScalarFieldEnum.name].map((field) => {
                return { [field]: { contains: search, mode: 'insensitive' } as Prisma.StringFilter };
            });

            return {
                OR: query,
            };
        }
        return {};
    }

    protected toOrderBy(
        query: Pick<ProjectQuery, 'orderBy' | 'orderDir'>,
    ): ProjectOrderByWithAggregationInput | undefined {
        if (query.orderBy || query.orderDir) {
            const orderBy = query.orderBy ?? 'id';
            const orderDir = query.orderDir ?? 'asc';
            return { [orderBy]: orderDir };
        }
        return undefined;
    }

    findMany(query: ProjectQuery) {
        return this.repo.findMany({
            ...this.toPagination(query),
            where: this.toWhere(),
            orderBy: this.toOrderBy(query),
            select: this.toProjection(),
        });
    }

    findOneById(id: number) {
        return this.repo.findUnique({ where: { id } });
    }

    findOneByName(name: string) {
        return this.repo.findUnique({ where: { name } });
    }
}

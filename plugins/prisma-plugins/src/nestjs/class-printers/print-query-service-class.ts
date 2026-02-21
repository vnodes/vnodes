import type { DMMF } from '@prisma/generator-helper';
import { isStringQueryField } from '@vnodes/prisma-helper';

export function printQueryServiceClass(model: DMMF.Model) {
    const stringFilters = model.fields
        .filter(isStringQueryField)
        .filter((field) => {
            return field.name !== 'id' && field.name !== 'uuid';
        })
        .map((field) => {
            if (field.isList) {
                return `{ ${field.name}: { has: search } }`;
            }
            return `{ ${field.name}: { contains: search, mode: 'insensitive' } }`;
        })
        .join(',\n');

    const includeProperties = model.fields
        .filter((e) => e.kind === 'object')
        .map((e) => {
            return `${e.name}: true`;
        })
        .join(', ');

    return [
        `import { Injectable } from '@nestjs/common';`,
        `import { YesNo } from '@vnodes/property';`,
        `import type * as P from '../../prisma/client.js';`,
        `import type { ${model.name}QueryDto } from './dtos/index.js';`,
        ``,
        `@Injectable()`,
        `export class ${model.name}QueryService {`,
        `    toOrderBy(query: ${model.name}QueryDto): P.Prisma.${model.name}OrderByWithRelationInput {`,
        `        const { orderBy, orderDir } = query;`,
        `        return { [orderBy ?? 'id']: orderDir ?? 'asc' };`,
        `    }`,
        ``,
        `    toWhere(query: ${model.name}QueryDto): P.Prisma.${model.name}WhereInput | undefined {`,
        `        const { search, withDeleted } = query;`,
        `        const where: P.Prisma.${model.name}WhereInput = {};`,
        `        if (search) {`,
        `            where.OR = [`,
        `                ${stringFilters}`,
        `            ];`,
        `        }`,
        ``,
        `        if (withDeleted !== YesNo.Yes) {`,
        `            where.deletedAt = null;`,
        `        }`,
        ``,
        `        return where;`,
        `    }`,
        ``,
        `    toFindManyArgs(query: ${model.name}QueryDto): P.Prisma.${model.name}FindManyArgs {`,
        `        return {`,
        `            take: query.take ?? 20,`,
        `            skip: query.skip ?? 0,`,
        `            orderBy: this.toOrderBy(query),`,
        `            where: this.toWhere(query),`,
        `            include: this.toInclude(),`,

        `        };`,
        `    }`,

        `   toInclude(): P.Prisma.${model.name}Include {`,
        `       return { ${includeProperties} };`,
        `   }`,

        `}`,
    ].join('\n');
}

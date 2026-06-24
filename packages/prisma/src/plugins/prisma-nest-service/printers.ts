import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { extractDecorators } from '../utils/extract-decorators.js';
import { isIncludedField, isSearchableField } from '../utils/is-field.js';

export function printServiceClass(model: DMMF.Model) {
  const { pascal, camel, kebab } = names(model.name);
  const __includes = model.fields
    .filter((e) => e.kind === 'object')
    .filter(isIncludedField)
    .map((field) => {
      const options = extractDecorators(field.documentation ?? '');

      if (options.select) {
        const selectedItems = [options.select].map((e) => `${e}: true`).join(',');
        return `${field.name}: { select: { ${selectedItems} } } `;
      } else if (options.include) {
        const includedItems = [options.select].map((e) => `${e}: true`).join(',');
        return `${field.name}: { include: {  ${includedItems} } } `;
      }
      return undefined;
    })
    .filter((e) => e !== undefined)
    .join(',');

  const includes = __includes ? `include: { ${__includes} }` : '';

  const whereOrList = model.fields
    .filter(isSearchableField)
    .map((e) => e.name)
    .map((e) => `{ ${e}:{ contains: query.search, model:'insensitive' }`)
    .join(',\n');

  return [
    `import { Injectable } from '@vnodes/nest';`,
    `import { InjectDelegate } from '@vnodes/prisma';`,
    `import { Prisma as P } from '../../prisma/client.js';`,
    `import type { ${pascal}QueryDto, ${pascal}CreateDto, ${pascal}UpdateDto } from './${kebab}.dto.js';`,
    ``,
    ``,
    `@Injectable()`,
    `export class ${pascal}Service {`,
    ``,
    `  constructor(@InjectDelegate(P.ModelName.${pascal}) protected readonly ${camel}Delegate: P.${pascal}Delegate) {}`,
    ``,
    `  protected toPaginationArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs {`,
    `    return {`,
    `      take: query.take ?? 20,`,
    `      skip: query.skip ?? 0,`,
    `    };`,
    `  }`,
    ``,
    `  protected toOrderByArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs | undefined {`,
    `    return {`,
    `      orderBy: { [query.orderBy ?? 'id']: query.orderDir ?? 'asc' },`,
    `    };`,
    `  }`,
    ``,
    `  protected toWhereArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs | undefined {`,
    `    const where: P.${pascal}FindManyArgs['where'] = {`,
    `      OR: [],`,
    `    };`,
    ``,
    `    if (query.withDeleted !== true) {`,
    `      where.deletedAt = { equals: null };`,
    `    }`,
    ``,
    `    if (query.search) {`,
    `      where.OR = [`,
    whereOrList,
    `      ]`,
    `    }`,
    ``,
    `    return undefined;`,
    `  }`,
    ``,
    `  protected toFindManyArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs {`,
    `    return {`,
    `      ...this.toWhereArgs(query),`,
    `      ...this.toOrderByArgs(query),`,
    `      ...this.toPaginationArgs(query),`,
    `      distinct: query.distinct ?? 'id',`,
    `    };`,
    `  }`,
    ``,
    `  findMany(query: ${pascal}QueryDto) {`,
    `    return this.${camel}Delegate.findMany({`,
    `      ...this.toFindManyArgs(query),`,
    `      ${includes}`,
    `    });`,
    `  }`,
    ``,
    `  findOneById(id: number) {`,
    `    return this.${camel}Delegate.findUnique({`,
    `      where: { id },`,
    `      ${includes}`,
    `    });`,
    `  }`,
    ``,
    `  deleteOneById(id: number) {`,
    `    return this.${camel}Delegate.delete({ where: { id }, select: { id: true } });`,
    `  }`,
    ``,
    `  softDeleteOneById(id: number) {`,
    `    return this.${camel}Delegate.update({ where: { id }, data: { deletedAt: new Date() }, select:{ id:true } });`,
    `  }`,
    ``,
    `  recoverOneById(id: number) {`,
    `    return this.${camel}Delegate.update({ where: { id }, data: { deletedAt: null } });`,
    `  }`,
    `}`,
  ].join('\n');
}

import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { extractDecorators } from '../utils/extract-decorators.js';
import { isIncludedField, isSearchableField, isSoftDeleteField } from '../utils/is-field.js';

export function printToWhereArgsFn(model: DMMF.Model) {
  const { pascal } = names(model.name);
  const searchableList = model.fields.filter(isSearchableField);
  const hasSearchable = searchableList.length > 0;

  const hasSoftdelete = model.fields.some(isSoftDeleteField);

  const orList = hasSearchable
    ? searchableList
        .map((fieldName) => fieldName.name)
        .map(
          (fieldName) =>
            `\t{ ${fieldName}:{ contains: query.search, mode: P.QueryMode.insensitive } }`,
        )
        .join(',\n')
    : '';

  const softDelete = hasSoftdelete
    ? [
        `    if (query.withDeleted !== true) {`,
        `      where.deletedAt = { equals: null };`,
        `    }`,
      ].join('\n')
    : '';

  const searchCondition = hasSearchable
    ? [`    if (query.search) {`, `      where.OR = [`, orList, `      ]`, `    }`].join('\n')
    : '';

  const initWhere = hasSearchable
    ? [`    const where: P.${pascal}FindManyArgs['where'] = {`, `      OR: [],`, `    };`].join(
        '\n',
      )
    : '';
  return [
    `  protected toWhereArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs | undefined {`,
    initWhere,
    ``,
    softDelete,
    ``,
    searchCondition,
    `return undefined`,
    `    }`,
  ].join('\n');
}

export function printIncludeOption(model: DMMF.Model) {
  const __includes = model.fields
    .filter((e) => e.kind === 'object')
    .filter(isIncludedField)
    .map((field) => {
      const options = extractDecorators(field.documentation ?? '');

      if (options.select) {
        if (options.select === true) {
          return `${field.name}: true`;
        } else if (typeof options.select === 'string') {
          if (!/\w+/.test(options.select))
            throw new Error(
              `${model.name}| ${field.name} | Invalid select option ${options.select}`,
            );
          return `${field.name}: { select: { ${options.select}:true  } }`;
        } else if (Array.isArray(options.select)) {
          const includes = options.select
            .map((e) => {
              if (!/\w+/.test(e))
                throw new Error(
                  `${model.name}| ${field.name} | Invalid select option ${options.select} || ${e}`,
                );
              return `${e}: true`;
            })
            .join(',');
          return `${field.name}: { select: {  ${includes} } } `;
        }
      } else if (options.include) {
        if (options.include === true) {
          return `${field.name}: true`;
        } else if (typeof options.include === 'string') {
          if (!/\w+/.test(options.include))
            throw new Error(
              `${model.name}| ${field.name} | Invalid select option ${options.include}`,
            );

          return `${field.name}: { include: { ${options.include}:true  } }`;
        } else if (Array.isArray(options.include)) {
          const includes = options.include
            .map((e) => {
              if (!/\w+/.test(e))
                throw new Error(
                  `${model.name}| ${field.name} | Invalid select option ${options.include}|| ${e}`,
                );
              return `${e}: true`;
            })
            .join(',');
          return `${field.name}: { include: {  ${includes} } } `;
        }
      }
      return undefined;
    })
    .filter((e) => e !== undefined)
    .join(',');

  return __includes ? `,include: { ${__includes} }` : '';
}

export function printServiceClass(model: DMMF.Model) {
  const { pascal, camel, kebab } = names(model.name);

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
    printToWhereArgsFn(model),
    ``,
    `  protected toFindManyArgs(query: ${pascal}QueryDto): P.${pascal}FindManyArgs {`,
    `    return {`,
    `      ...this.toWhereArgs(query),`,
    `      ...this.toOrderByArgs(query),`,
    `      ...this.toPaginationArgs(query),`,
    `      distinct: query.distinct ?? 'id'`,
    `    };`,
    `  }`,
    ``,
    `  createOne(data:${pascal}CreateDto){`,
    `     return this.${camel}Delegate.create({ data })`,
    `  }`,
    `  updateOneById(id:number, data:${pascal}UpdateDto){`,
    `     return this.${camel}Delegate.update({ where:{ id }, data })`,
    `  }`,
    ``,
    `  findMany(query: ${pascal}QueryDto) {`,
    `    return this.${camel}Delegate.findMany({`,
    `      ...this.toFindManyArgs(query)`,
    `      ${printIncludeOption(model)}`,
    `    });`,
    `  }`,
    ``,

    `}`,
  ].join('\n');
}

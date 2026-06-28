import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { extractDecorators } from '../utils/extract-decorators.js';
import {
  isDeleteByField,
  isFindByField,
  isIncludedField,
  isSearchableField,
  isSoftDeleteField,
  isUpdatedByField,
  isValidPropertyName,
} from '../utils/is-field.js';

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
      ]
        .filter((e) => e)
        .join('\n')
    : '';

  const searchCondition = hasSearchable
    ? [
        `    if (query.search) {`,
        `      where.OR = [`,
        orList,
        `      ]`,
        `return { where  }`,
        `    }`,
      ]
        .filter((e) => e)
        .join('\n')
    : '';

  const initWhere = hasSearchable
    ? [`    const where: P.${pascal}FindManyArgs['where'] = {`, `      OR: [],`, `    };`].join(
        '\n',
      )
    : '';
  return [
    `  protected toWhereArgs(query: D.${pascal}QueryDto): P.${pascal}FindManyArgs | undefined {`,
    initWhere,
    ``,
    softDelete,
    ``,
    searchCondition,
    `return undefined`,
    `    }`,
  ]
    .filter((e) => e)
    .join('\n');
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
          if (!isValidPropertyName(options.select))
            throw new Error(
              `${model.name}| ${field.name} | Invalid select option ${options.select}`,
            );
          return `${field.name}: { select: { ${options.select}:true  } }`;
        } else if (Array.isArray(options.select)) {
          const includes = options.select
            .map((e) => {
              if (!isValidPropertyName(e))
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
          if (!isValidPropertyName(options.include))
            throw new Error(
              `${model.name}| ${field.name} | Invalid select option ${options.include}`,
            );

          return `${field.name}: { include: { ${options.include}:true  } }`;
        } else if (Array.isArray(options.include)) {
          const includes = options.include
            .map((e) => {
              if (!isValidPropertyName(e))
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
  const { pascal: modelPascal, camel: modelCamel, kebab } = names(model.name);

  const delegateName = `${modelCamel}Delegate`;
  const delegateClassName = `P.${modelPascal}Delegate`;
  const queryDtoName = `D.${modelPascal}QueryDto`;

  const includeOptions = printIncludeOption(model);

  const updateDtoName = `D.${modelPascal}UpdateDto`;
  const createDtoName = `D.${modelPascal}CreateDto`;
  const createManyDtoName = `D.${modelPascal}CreateManyDto`;

  function printByFn(
    prefix: 'findOneBy' | 'deleteOneBy' | 'updateOneBy' | 'updateManyBy',
    field: DMMF.Field,
  ) {
    const { pascal: fieldPascal } = names(field.name);

    const methodName = `${prefix}${fieldPascal}`;

    const byQueryDtoName = `D.${modelPascal}By${fieldPascal}Dto`;

    if (prefix === 'findOneBy') {
      const delegateMethod = field.isUnique || field.isId ? 'findUnique' : 'findFirst';
      return [
        `${methodName}(where: ${byQueryDtoName}){`,
        `   return this.${delegateName}.${delegateMethod}({ where ${includeOptions} })`,
        `}`,
      ].join('\n');
    } else if (prefix === 'updateOneBy') {
      return [
        `${methodName}(where: ${byQueryDtoName}, data: ${updateDtoName}){`,
        `return this.${delegateName}.update({ where , data ${includeOptions} })`,
        `}`,
      ].join('\n');
    } else if (prefix === 'deleteOneBy') {
      return [
        `${methodName}(where: ${byQueryDtoName}){`,
        `return this.${delegateName}.delete({ where ${includeOptions} })`,
        `}`,
      ].join('\n');
    }

    return undefined;
  }

  const findByFields = model.fields.filter(isFindByField);
  const hasFindByFields = findByFields.length > 0;
  const findByFns = hasFindByFields
    ? findByFields
        .map((field) => printByFn('findOneBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  const updateByFields = model.fields.filter(isUpdatedByField);
  const hasUpdateByField = updateByFields.length > 0;
  const updateByFns = hasUpdateByField
    ? updateByFields
        .map((field) => printByFn('updateOneBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  const deleteByFields = model.fields.filter(isDeleteByField);
  const hasDeleteByField = deleteByFields.length > 0;
  const deleteByFns = hasDeleteByField
    ? deleteByFields
        .map((field) => printByFn('deleteOneBy', field))
        .filter((e) => e)
        .join('\n')
    : '';

  return [
    `import { Injectable } from '@vnodes/nest';`,
    `import { InjectDelegate } from '@vnodes/prisma';`,
    `import { Prisma as P } from '../../prisma/client.js';`,
    `import * as D  from './${kebab}.dto.js';`,
    ``,
    ``,
    `@Injectable()`,
    `export class ${modelPascal}Service {`,
    ``,
    `  constructor(@InjectDelegate(P.ModelName.${modelPascal}) protected readonly ${delegateName}: ${delegateClassName}) {}`,
    ``,
    `  protected toPaginationArgs(query: ${queryDtoName}): P.${modelPascal}FindManyArgs {`,
    `    return {`,
    `      take: query.take ?? 20,`,
    `      skip: query.skip ?? 0,`,
    `    };`,
    `  }`,
    ``,
    `  protected toOrderByArgs(query: ${queryDtoName}): P.${modelPascal}FindManyArgs | undefined {`,
    `    return {`,
    `      orderBy: { [query.orderBy ?? 'id']: query.orderDir ?? 'asc' },`,
    `    };`,
    `  }`,
    ``,
    printToWhereArgsFn(model),
    ``,
    `  protected toFindManyArgs(query: ${queryDtoName}): P.${modelPascal}FindManyArgs {`,
    `    return {`,
    `      ...this.toWhereArgs(query),`,
    `      ...this.toOrderByArgs(query),`,
    `      ...this.toPaginationArgs(query),`,
    `      distinct: query.distinct ?? 'id'`,
    `    };`,
    `  }`,
    ``,
    `  createOne(data: ${createDtoName}){`,
    `     return this.${delegateName}.create({ data })`,
    `  }`,
    ``,
    `  createMany(data: ${createManyDtoName}){`,
    `     return this.${delegateName}.createMany(data)`,
    `  }`,
    ``,
    `  findMany(query: ${queryDtoName}) {`,
    `    return this.${delegateName}.findMany({`,
    `      ...this.toFindManyArgs(query)`,
    `      ${includeOptions}`,
    `    });`,
    `  }`,
    ``,
    findByFns,
    updateByFns,
    deleteByFns,
    `}`,
  ]
    .filter((e) => e)
    .join('\n');
}

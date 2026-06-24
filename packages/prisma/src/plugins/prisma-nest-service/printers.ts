import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import { extractDecorators } from '../utils/extract-decorators.js';
import {
  isDeleteByField,
  isDeleteManyByField,
  isFindByField,
  isIncludedField,
  isSearchableField,
  isSoftDeleteField,
  isValidPropertyName,
} from '../utils/is-field.js';
import { getTsTypeOf } from '../utils/ts-type.js';

export function printCreateManyFn(model: DMMF.Model) {
  const { camel: modelCamel } = names(model.name);
  // const { pascal, camel } = names(field.name);
  return [
    `createMany(data: ${model.name}CreateManyDto) {`,
    `   return this.${modelCamel}Delegate.createMany(data)`,
    `}`,
  ].join('\n');
}

export function printUpdateManyFn(model: DMMF.Model) {
  const { camel: modelCamel } = names(model.name);
  // const { pascal, camel } = names(field.name);
  return [
    `updateMany(data: ${model.name}UpdateManyDto) {`,
    `   return this.${modelCamel}Delegate.updateMany(data)`,
    `}`,
  ].join('\n');
}

export function printUpdateManyByFn(model: DMMF.Model, field: DMMF.Field) {
  const { camel: modelCamel } = names(model.name);
  const { pascal, camel } = names(field.name);
  return [
    `updateManyBy${pascal}(${camel}: ${getTsTypeOf(field)}, data: ${model.name}UpdateDto) {`,
    `   return this.${modelCamel}Delegate.updateMany({ where: { ${camel} }, data  })`,
    `}`,
  ].join('\n');
}
export function printUpdateByFn(model: DMMF.Model, field: DMMF.Field) {
  const { camel: modelCamel } = names(model.name);
  const { pascal, camel } = names(field.name);
  return [
    `updateOneBy${pascal}(${camel}: ${getTsTypeOf(field)}, data: ${model.name}UpdateDto) {`,
    `   return this.${modelCamel}Delegate.update({ where: { ${camel} }, data  ${printIncludeOption(model)} })`,
    `}`,
  ].join('\n');
}
export function printDeleteManyByFn(model: DMMF.Model, field: DMMF.Field) {
  const { camel: modelCamel } = names(model.name);
  const { pascal, camel } = names(field.name);
  return [
    `deleteManyBy${pascal}(${camel}: ${getTsTypeOf(field)}) {`,
    `   return this.${modelCamel}Delegate.deleteMany({ where: { ${camel} } })`,
    `}`,
  ].join('\n');
}
export function printDeleteByFn(model: DMMF.Model, field: DMMF.Field) {
  const { camel: modelCamel } = names(model.name);
  const { pascal, camel } = names(field.name);
  return [
    `deleteOneBy${pascal}(${camel}: ${getTsTypeOf(field)}) {`,
    `   return this.${modelCamel}Delegate.delete({ where: { ${camel} }  ${printIncludeOption(model)} })`,
    `}`,
  ].join('\n');
}

export function printFindByFn(model: DMMF.Model, field: DMMF.Field) {
  const { camel: modelCamel } = names(model.name);
  const { pascal, camel } = names(field.name);

  const delegateMethodName = field.isUnique || field.isId ? 'findUnique' : 'findFirst';
  return [
    `findOneBy${pascal}(${camel}: ${getTsTypeOf(field)}) {`,
    `   return this.${modelCamel}Delegate.${delegateMethodName}({ where: { ${camel} }  ${printIncludeOption(model)} })`,
    `}`,
  ].join('\n');
}

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
    ? [
        `    if (query.search) {`,
        `      where.OR = [`,
        orList,
        `      ]`,
        `return { where  }`,
        `    }`,
      ].join('\n')
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
  const { pascal, camel, kebab } = names(model.name);

  const findByFields = model.fields.filter(isFindByField);

  const hasFindByFields = findByFields.length > 0;

  const findByFns = hasFindByFields
    ? findByFields
        .map((field) => {
          return printFindByFn(model, field);
        })
        .join('\n')
    : '';

  const deleteByFields = model.fields.filter(isDeleteByField);
  const hasDeleteByField = deleteByFields.length > 0;
  const deleteByFns = hasDeleteByField
    ? deleteByFields.map((field) => printDeleteByFn(model, field)).join('\n')
    : '';

  const deleteManyByFields = model.fields.filter(isDeleteManyByField);

  const hasDeleteManyField = deleteManyByFields.length > 0;

  const deleteManyByFns = hasDeleteManyField
    ? deleteManyByFields.map((field) => printDeleteManyByFn(model, field)).join('\n')
    : '';

  const updateByFields = model.fields.filter(isDeleteByField);
  const hasUpdateByField = updateByFields.length > 0;
  const updateByFns = hasUpdateByField
    ? updateByFields.map((field) => printUpdateByFn(model, field)).join('\n')
    : '';

  const updateManyByFns = hasUpdateByField
    ? updateByFields.map((field) => printUpdateManyByFn(model, field)).join('\n')
    : '';

  const enumModule = model.fields.some((e) => e.kind === 'enum') ? ',$Enums as E' : '';

  return [
    `import { Injectable } from '@vnodes/nest';`,
    `import { InjectDelegate } from '@vnodes/prisma';`,
    `import { Prisma as P ${enumModule} } from '../../prisma/client.js';`,
    `import type { ${pascal}QueryDto, ${pascal}CreateDto, ${pascal}UpdateDto, ${pascal}CreateManyDto, ${pascal}UpdateManyDto } from './${kebab}.dto.js';`,
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
    ``,
    `  findMany(query: ${pascal}QueryDto) {`,
    `    return this.${camel}Delegate.findMany({`,
    `      ...this.toFindManyArgs(query)`,
    `      ${printIncludeOption(model)}`,
    `    });`,
    `  }`,
    ``,

    findByFns,
    deleteByFns,
    deleteManyByFns,
    updateByFns,
    updateManyByFns,

    printCreateManyFn(model),
    printUpdateManyFn(model),

    `}`,
  ].join('\n');
}

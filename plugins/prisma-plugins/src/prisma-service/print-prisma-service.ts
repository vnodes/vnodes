import type { DMMF } from '@prisma/generator-helper';
import { type Names, names } from '@vnodes/names';
import {
    fieldItemTypeAsString,
    fieldTypeAsString,
    hasSoftDeleteField,
    isNumberField,
    isStringField,
    isUnqiueField,
} from '@vnodes/prisma-helper';

export type MethodOptions = {
    type: string;
    isList?: boolean;
} & Names;

export function updateUniqueByMethods(options: MethodOptions) {
    return `async updateBy${options.pascalCase}(${options.camelCase}: ${options.type}, data: UpdateInput){ 
        return await this.repo.update({ where: { ${options.camelCase} }, data })
    }`;
}

export function findUniqueByMethod(options: MethodOptions) {
    return `async findBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.findUnique({ where: { ${options.camelCase} } })
    }`;
}

export function findFirstByMethod(options: MethodOptions) {
    const whereOptions = options.isList
        ? `{ ${options.camelCase}: { has: ${options.camelCase} } }`
        : `{ ${options.camelCase} } `;

    return `async findBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.findFirst({ where: ${whereOptions} })
    }`;
}

export function deleteUniqueByMethod(options: MethodOptions) {
    return `async deleteBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.delete({ where: { ${options.camelCase} } })
    }`;
}

export function softDeleteByMethod(options: MethodOptions) {
    return `async softDeleteBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.update({ where: { ${options.camelCase} }, data:{ deletedAt:new Date() } })
    }`;
}

export function printWhereHelper(modelName: string, noneUniqueTextFields: DMMF.Field[], hasSoftDelete: boolean) {
    const containsQuery = noneUniqueTextFields
        .map((e) => {
            if (e.isList) {
                return `{ ${e.name}: { has: query.search } }`;
            } else {
                return `{ ${e.name}: { contains: query.search, mode: "insensitive" } }`;
            }
        })
        .join(',');

    const deletedAtOperation = hasSoftDelete
        ? `if(!query.withDeleted){ 
            whereQuery.deletedAt = null; 
        }`
        : undefined;

    const whereQuery = containsQuery.trim() ? `{ OR: [ ${containsQuery} ] } ` : '{}';

    return [
        `toWhere(query: QueryInput){`,
        `const whereQuery:P.${modelName}WhereInput = ${whereQuery}`,
        deletedAtOperation,
        `return whereQuery`,

        `}`,
    ]
        .filter((e) => e)
        .join('\n');
}

export function printOrderByHelper() {
    return [
        `toOrderBy(query: QueryInput){`,
        `if(query.orderBy){`,
        `   return { [query.orderBy]: query.orderDir ?? 'asc' }  `,
        `}`,
        'return undefined',

        `}`,
    ].join('\n');
}

export function printFindManyArgshelper(modelName: string) {
    return [
        `toFindManyArgs(query: QueryInput ):P.${modelName}FindManyArgs {`,
        `    return {`,
        `        take: query.take ?? 20,`,
        `        skip: query.skip ?? 0,`,
        `        orderBy: this.toOrderBy(query),`,
        `        where: this.toWhere(query)`,
        `    }`,
        `}`,
    ].join('\n');
}

export function printService(model: DMMF.Model) {
    const modelNames = names(model.name);
    const hasSoftDelete = hasSoftDeleteField(model);
    const { pascalCase } = modelNames;
    const uniqueFields = model.fields.filter(isUnqiueField);
    const noneUniqueTextFields = model.fields.filter(isStringField).filter((e) => !isUnqiueField(e));
    const noneUniqueNumberFields = model.fields.filter(isNumberField).filter((e) => !isUnqiueField(e));

    const updateByMethods = uniqueFields
        .map((field) => {
            return updateUniqueByMethods({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const findUniqueByMethods = uniqueFields
        .map((field) => {
            return findUniqueByMethod({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const findFirstByTextMethods = noneUniqueTextFields
        .map((field) => {
            return findFirstByMethod({
                ...names(field.name),
                type: fieldItemTypeAsString(field),
                isList: field.isList,
            });
        })
        .join('\n');

    const findFirstByNumberMethods = noneUniqueNumberFields
        .map((field) => {
            return findFirstByMethod({
                ...names(field.name),
                type: fieldItemTypeAsString(field),
                isList: field.isList,
            });
        })
        .join('\n');

    const deleteByMethods = uniqueFields
        .map((field) => {
            return deleteUniqueByMethod({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const softDeleteMethods = hasSoftDeleteField(model)
        ? uniqueFields
              .map((field) => {
                  return softDeleteByMethod({ ...names(field.name), type: fieldTypeAsString(field) });
              })
              .join('\n')
        : undefined;

    const allMethods = [
        printWhereHelper(pascalCase, noneUniqueTextFields, hasSoftDelete),
        printOrderByHelper(),
        printFindManyArgshelper(pascalCase),
        `async find(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }`,
        findUniqueByMethods,
        findFirstByTextMethods,
        findFirstByNumberMethods,
        `async create(data: CreateInput){ 
            return await this.repo.create({ data })
        }`,
        updateByMethods,
        deleteByMethods,
        softDeleteMethods,
    ]
        .filter((e) => e)
        .join('\n');

    const generics = [
        ['Create', 'Update']
            .map((e) => {
                return `${e}Input extends P.${pascalCase}${e}Input = P.${pascalCase}${e}Input`;
            })
            .join(', '),
        `QueryInput extends QueryMany<P.${pascalCase}ScalarFieldEnum> = QueryMany<P.${pascalCase}ScalarFieldEnum>`,
    ].join(',');

    return `export class ${pascalCase}DelegateService<${generics}> { 

        constructor(protected readonly repo: P.${pascalCase}Delegate){}

        ${allMethods}
    }`;
}

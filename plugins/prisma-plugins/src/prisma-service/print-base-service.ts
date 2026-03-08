import type { DMMF } from '@prisma/generator-helper';
import { type Names, names } from '@vnodes/names';
import {
    Annotations,
    fieldItemTypeAsString,
    fieldTypeAsString,
    hasSoftDeleteField,
    isNumberField,
    isStringField,
    isUnqiueField,
} from '@vnodes/prisma-helper';
import { printBaseController } from './print-base-controller.js';

export type MethodOptions = {
    type: string;
    isList?: boolean;
} & Names;

export function updateUniqueByMethods(options: MethodOptions) {
    return `async updateOneBy${options.pascalCase}(${options.camelCase}: ${options.type}, data: UpdateInput){ 
        return await this.repo.update({ where: { ${options.camelCase} }, data })
    }`;
}

export function findUniqueByMethod(options: MethodOptions) {
    return `async findOneBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.findUnique({ where: { ${options.camelCase} } })
    }`;
}

export function findFirstByMethod(options: MethodOptions) {
    const whereOptions = options.isList
        ? `{ ${options.camelCase}: { has: ${options.camelCase} } }`
        : `{ ${options.camelCase} } `;

    return `async findOneBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.findFirst({ where: ${whereOptions} })
    }`;
}

export function findFirstByMoreThanMethod(options: MethodOptions) {
    return `async findOneBy${options.pascalCase}MoreThan(${options.camelCase}: ${options.type}){ 
        return await this.repo.findFirst({ where: {${options.camelCase}: { gte: ${options.camelCase} } } })
    }`;
}

export function findFirstByLessThanMethod(options: MethodOptions) {
    return `async findOneBy${options.pascalCase}LessThan(${options.camelCase}: ${options.type}){ 
        return await this.repo.findFirst({ where: {${options.camelCase}: { lte: ${options.camelCase} } } })
    }`;
}

export function deleteUniqueByMethod(options: MethodOptions) {
    return `async deleteOneBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.delete({ where: { ${options.camelCase} } })
    }`;
}

export function softDeleteByMethod(options: MethodOptions) {
    return `async softDeleteOneBy${options.pascalCase}(${options.camelCase}: ${options.type}){ 
        return await this.repo.update({ where: { ${options.camelCase} }, data:{ deletedAt: new Date() } })
    }`;
}

export function printWhereHelper(modelName: string, noneIdTextFields: DMMF.Field[], hasSoftDelete: boolean) {
    const containsQuery = noneIdTextFields
        .map((e) => {
            if (e.isList) {
                return `{ ${e.name}: { has: query.search } }`;
            } else {
                return `{ ${e.name}: { contains: query.search, mode: "insensitive" } }`;
            }
        })
        .join(',');

    const deletedAtOperation = hasSoftDelete
        ? `if(!query?.withDeleted){ 
            whereQuery.deletedAt = null; 
        }`
        : undefined;

    const whereQuery = containsQuery.trim() ? `{ OR: [ ${containsQuery} ] } ` : '{}';

    return [
        `toWhere(query?: QueryInput){`,
        `const whereQuery:P.${modelName}WhereInput = query?.search ?   ${whereQuery}: {}`,
        deletedAtOperation,
        `return whereQuery`,

        `}`,
    ]
        .filter((e) => e)
        .join('\n');
}

export function printOrderByHelper() {
    return [
        `toOrderBy(query?: QueryInput){`,
        `if(query?.orderBy){`,
        `   return { [query.orderBy]: query.orderDir ?? 'asc' }  `,
        `}`,
        'return undefined',

        `}`,
    ].join('\n');
}

export function printFindManyArgshelper(modelName: string) {
    return [
        `toFindManyArgs(query?: QueryInput ):P.${modelName}FindManyArgs {`,
        `    return {`,
        `        take: query?.take ?? 20,`,
        `        skip: query?.skip ?? 0,`,
        `        orderBy: this.toOrderBy(query),`,
        `        where: this.toWhere(query),`,
        `        include: this.toInclude()`,
        `    }`,
        `}`,
    ].join('\n');
}

export function printIncludeHelper(model: DMMF.Model) {
    const includedFields = model.fields
        .filter((e) => e.kind === 'object')
        .filter((e) => Annotations.include(e.documentation))
        .map((e) => `${e.name}: true`)
        .join(',');

    const result = includedFields.length > 0 ? `{${includedFields}}` : undefined;

    return [`toInclude(){`, ``, `return  ${result}`, `}`].join('\n');
}
export function printBaseService(model: DMMF.Model) {
    const modelNames = names(model.name);
    const hasSoftDelete = hasSoftDeleteField(model);
    const { pascalCase } = modelNames;
    const idFields = model.fields.filter(isUnqiueField).filter((e) => e.name === 'id' || e.name === 'uuid');
    const noneIdTextFields = model.fields.filter(isStringField).filter((e) => {
        if (e.name === 'id' || e.name === 'uuid') {
            return false;
        }
        return true;
    });
    const noneUniqueNumberFields = model.fields.filter(isNumberField).filter((e) => !isUnqiueField(e));
    const noneUniqueNoneArrayFields = noneUniqueNumberFields.filter((e) => !e.isList);
    const updateByMethods = idFields
        .map((field) => {
            return updateUniqueByMethods({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const findUniqueByMethods = idFields
        .map((field) => {
            return findUniqueByMethod({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const findFirstByTextMethods = noneIdTextFields
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

    const numberFindMoreLessMethods = noneUniqueNoneArrayFields
        .map((field) => {
            return [
                findFirstByMoreThanMethod({
                    ...names(field.name),
                    type: fieldItemTypeAsString(field),
                    isList: field.isList,
                }),
                findFirstByLessThanMethod({
                    ...names(field.name),
                    type: fieldItemTypeAsString(field),
                    isList: field.isList,
                }),
            ].join('\n');
        })
        .join('\n');

    const deleteByMethods = idFields
        .map((field) => {
            return deleteUniqueByMethod({
                ...names(field.name),
                type: fieldTypeAsString(field),
            });
        })
        .join('\n');

    const softDeleteMethods = hasSoftDeleteField(model)
        ? idFields
              .map((field) => {
                  return softDeleteByMethod({ ...names(field.name), type: fieldTypeAsString(field) });
              })
              .join('\n')
        : undefined;

    const allMethods = [
        printIncludeHelper(model),
        printWhereHelper(pascalCase, noneIdTextFields, hasSoftDelete),
        printOrderByHelper(),
        printFindManyArgshelper(pascalCase),
        `async findMany(query: QueryInput) { 
            return await this.repo.findMany(this.toFindManyArgs(query))
        }`,
        findUniqueByMethods,
        findFirstByTextMethods,
        findFirstByNumberMethods,
        numberFindMoreLessMethods,
        `async createOne(data: CreateInput){ 
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

    const baseService = `export class Base${pascalCase}Service<${generics}> { 

        constructor(protected readonly repo: P.${pascalCase}Delegate){}

        ${allMethods}
    }`;

    const baseController = printBaseController(model);

    return [baseService, baseController].join('\n\n');
}

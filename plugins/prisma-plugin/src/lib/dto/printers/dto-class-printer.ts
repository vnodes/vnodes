import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import {
    extractPropOptions,
    isFindByField,
    isInputProp,
    isRelationProp,
    isSearchableField,
    parsePropOptions,
    propType,
} from '@vnodes/prisma-plugin-helpers';
import { joinLines } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';
import { DtoPropertyPrinter } from './dto-property-printer.js';

export class DtoClassPrinter {
    protected readonly readDtoName: string;
    protected readonly createDtoName: string;
    protected readonly updateDtoName: string;
    protected readonly queryDtoName: string;
    protected readonly serviceName: string;

    constructor(
        protected readonly datamodel: DMMF.Datamodel,
        protected readonly model: DMMF.Model,
        protected readonly generatorOptions: DtoGeneratorOptions,
    ) {
        const { pascal } = names(model.name);
        this.readDtoName = `${pascal}Dto`;
        this.createDtoName = `${pascal}CreateDto`;
        this.updateDtoName = `${pascal}UpdateDto`;
        this.queryDtoName = `${pascal}QueryDto`;
        this.serviceName = `Base${pascal}Service`;
    }

    protected printReadDtoProperties() {
        return joinLines(
            ...this.model.fields
                .filter((field) => {
                    return !isRelationProp(field);
                })
                .map((field) => {
                    return new DtoPropertyPrinter(this.datamodel, this.model, field, this.generatorOptions).print();
                }),
        );
    }

    protected printCreateDtoProperties() {
        return joinLines(
            ...this.model.fields
                .filter((field) => {
                    const options = field.documentation
                        ? parsePropOptions(extractPropOptions(field.documentation))
                        : {};
                    return isInputProp(field, options);
                })
                .map((field) => {
                    return new DtoPropertyPrinter(this.datamodel, this.model, field, this.generatorOptions).print();
                }),
        );
    }

    protected printReadDto() {
        return joinLines(
            `export class ${this.readDtoName} { 
            ${this.printReadDtoProperties()}
            }`,
        );
    }

    protected printCreateDto() {
        return joinLines(`export class ${this.createDtoName}{`, this.printCreateDtoProperties(), `}`);
    }

    protected printUpdateDto() {
        return joinLines(`export class ${this.updateDtoName} extends PartialType(${this.createDtoName}) {}`);
    }

    protected printQueryDto() {
        return joinLines(
            `export class ${this.queryDtoName} extends PaginationDto {`,
            `    @Prop({ enum: Prisma.${this.model.name}ScalarFieldEnum }) orderBy?: Prisma.${this.model.name}ScalarFieldEnum;`,
            `    @Prop({ enum: Prisma.SortOrder }) orderDir?: Prisma.SortOrder;`,
            `    @Prop() search?: string;`,
            `    @Prop() withDeleted?: boolean;`,
            `}`,
        );
    }

    protected printQueryParserFn() {
        const searchQuery = this.model.fields
            .filter(isSearchableField)
            .map((e) => {
                return `{ ${e.name}: { contains: search, mode: 'insensitive' } }`;
            })
            .join(',');
        return joinLines(
            `export function normalize${this.queryDtoName}(query: ${this.queryDtoName}):Prisma.${this.model.name}FindManyArgs {`,
            `    const { take, skip, search } = query;`,
            ``,
            `    const orderBy: Prisma.${this.model.name}OrderByWithRelationInput | undefined = query.orderBy`,
            `        ? { [query.orderBy]: query.orderDir ?? 'asc' }`,
            `        : undefined;`,
            ``,
            `    const where: Prisma.${this.model.name}WhereInput | undefined = search`,
            `        ? {`,
            `              OR: [${searchQuery}]`,
            `          }`,
            `        : undefined;`,
            ``,
            `    return { take, skip, where, orderBy };`,
            `}`,
        );
    }

    protected printUpdateAndDeleteMethods() {
        return this.model.fields
            .filter((field) => {
                return field.isUnique || field.isId;
            })
            .map((field) => {
                const { pascal, camel } = names(field.name);

                return joinLines(
                    ``,
                    `   async updateOneBy${pascal}(${camel}:${propType(field)}, data: ${this.updateDtoName}) {`,
                    `        await this.findOneBy${pascal}OrThrow(${camel})`,
                    `        return await this.repo.update({ where: { ${camel} }, data });`,
                    `    }`,

                    `    async deleteOneBy${pascal}(${camel}:${propType(field)}) {`,
                    `        await this.findOneBy${pascal}OrThrow(${camel})`,
                    `        return await this.repo.update({ where: { ${camel} }, data: { deletedAt: new Date() } });`,
                    `    }`,

                    `    async deleteOneBy${pascal}Hard(${camel}:${propType(field)}) {`,
                    `        await this.findOneBy${pascal}OrThrow(${camel})`,
                    `        return await this.repo.delete({ where: { ${camel} } });`,
                    `    }`,
                );
            })
            .join('\n');
    }
    protected printFindByMethods() {
        return this.model.fields
            .filter(isFindByField)
            .map((field) => {
                const { pascal, camel } = names(field.name);

                return joinLines(
                    `   async findOneBy${pascal}(${camel}:${propType(field)}){`,
                    `     return this.repo.findFirst({ where: { ${camel} } })`,
                    `   }`,

                    `   async findOneBy${pascal}OrThrow(${camel}:${propType(field)}){`,
                    `     return this.repo.findFirstOrThrow({ where: { ${camel} } })`,
                    `   }`,
                );
            })
            .join('\n');
    }

    protected printService() {
        return joinLines(
            `export class ${this.serviceName} {`,
            `    constructor(protected readonly repo: Prisma.${this.model.name}Delegate) {}`,
            ``,
            `   async findMany(query: ${this.queryDtoName}) {`,
            `        return await this.repo.findMany(normalize${this.queryDtoName}(query));`,
            `    }`,
            ``,
            ``,
            `   async createOne(data: ${this.createDtoName}) {`,
            `        return await this.repo.create({ data });`,
            `    }`,

            this.printFindByMethods(),
            this.printUpdateAndDeleteMethods(),
            `}`,
        );
    }

    print() {
        return joinLines(
            this.printReadDto(),
            this.printCreateDto(),
            this.printUpdateDto(),
            this.printQueryDto(),
            this.printQueryParserFn(),
            this.printService(),
        );
    }
}

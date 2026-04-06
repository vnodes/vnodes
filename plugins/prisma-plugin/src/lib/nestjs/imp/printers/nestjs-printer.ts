import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import {
    extractPropOptions,
    isCountProp,
    isFindByProp,
    isInputProp,
    isRelationProp,
    isSearchProp,
    isSoftDeleteProp,
    parsePropOptions,
    propType,
} from '@vnodes/prisma-plugin-helpers';
import { joinLines } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';
import { DtoPropertyPrinter } from './dto-property-printer.js';

export class NestjsPrinter {
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
            .filter(isSearchProp)
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

    protected __printHardDeleteMethod(field: DMMF.Field) {
        const { pascal, camel } = names(field.name);
        const fieldType = propType(field);
        return joinLines(
            `async deleteOneBy${pascal}Hard(${camel}: ${fieldType}){ `,
            `    await this.findOneBy${pascal}OrThrow(${camel})`,
            `    return await this.repo.delete({ where: { ${camel} } })`,
            `}`,
        );
    }

    protected __printSoftDeleteMethod(field: DMMF.Field, softDeleteField: DMMF.Field) {
        const { pascal, camel } = names(field.name);
        const fieldType = propType(field);
        const softDeleteFieldName = softDeleteField.name;
        return joinLines(
            `async deleteOneBy${pascal}(${camel}: ${fieldType}){ `,
            `    await this.findOneBy${pascal}OrThrow(${camel})`,
            `    return await this.repo.update({ where: { ${camel}, ${softDeleteFieldName}: null }, data:{ ${softDeleteFieldName}: new Date() } })`,
            `}`,
        );
    }
    protected printDeleteMethods() {
        const deleteMethods: string[] = [];
        const deleteByFields = this.model.fields.filter((field) => {
            return field.isUnique || field.isId;
        });
        const softDeleteField = this.model.fields.find(isSoftDeleteProp);

        // Soft delete methods
        if (softDeleteField) {
            const softDeleteMethods = deleteByFields.map((field) => {
                return this.__printSoftDeleteMethod(field, softDeleteField);
            });

            deleteMethods.push(...softDeleteMethods);
        }

        // Hard delete methods
        {
            const methods = deleteByFields.map((field) => {
                return this.__printHardDeleteMethod(field);
            });
            deleteMethods.push(...methods);
        }
        return joinLines(...deleteMethods);
    }

    protected printCountMethods() {
        const countFields = this.model.fields.filter(isCountProp);

        const countMethods = countFields.map((field) => {
            const { pascal, camel } = names(field.name);
            const fieldType = propType(field);
            return joinLines(
                `async countBy${pascal}(${camel}: ${fieldType} ){ `,
                `    return await this.repo.count({ where:{ ${camel} } })`,
                `}`,
            );
        });

        return joinLines(...countMethods);
    }

    protected printUpdateMethods() {
        const updateByFields = this.model.fields.filter((field) => {
            return field.isUnique || field.isId;
        });
        const updateMethods = updateByFields.map((field) => {
            const { pascal, camel } = names(field.name);

            return joinLines(
                `   async updateOneBy${pascal}(${camel}:${propType(field)}, data: ${this.updateDtoName}) {`,
                `        await this.findOneBy${pascal}OrThrow(${camel})`,
                `        await this.isUnique(data)`,
                `        return await this.repo.update({ where: { ${camel} }, data });`,
                `    }`,
            );
        });
        return joinLines(...updateMethods);
    }
    protected printFindByMethods() {
        const findByFields = this.model.fields.filter(isFindByProp);
        const findBymethods = findByFields.map((field) => {
            const { pascal, camel } = names(field.name);

            return joinLines(
                `   async findOneBy${pascal}(${camel}: ${propType(field)}){`,
                `     return await this.repo.findFirst({ where: { ${camel} } })`,
                `   }`,

                `   async findOneBy${pascal}OrThrow(${camel}: ${propType(field)}){`,
                `     const found =  await this.findOneBy${pascal}(${camel})`,
                `     if(!found) throw new NotFoundException('Not found by ${camel}')`,
                `     return found;`,
                `   }`,

                `   async findManyBy${pascal}(${camel}: ${propType(field)}){`,
                `     return await this.repo.findMany({ where: { ${camel} } })`,
                `   }`,
            );
        });

        return joinLines(...findBymethods);
    }

    protected printFindRelationMethods() {
        return this.model.fields
            .filter((field) => field.kind === 'object')
            .map((field) => {
                return joinLines(
                    `   async find${field.type}Of(id: number){ `,
                    `      const result = await this.repo.findUnique({`,
                    `          where: { id },`,
                    `          select: { ${field.name}: true }`,
                    `      })`,
                    `      return result?.${field.name}`,
                    `   }`,
                );
            })
            .join('\n');
    }

    protected printIsUnqieuMethod() {
        const uniqueFields = this.model.fields
            .filter((field) => field.isUnique)
            .map((field) => `'${field.name}'`)
            .join(',');
        return `
    async isUnique(data: Partial<Prisma.SampleModel>) {
        const uniqueData = pick(data, [${uniqueFields}]);
        const uniqueKeys = keys(uniqueData);
        const errors: ValidationError[] = [];

        for (const key of uniqueKeys) {
            const found = await this.repo.findUnique({ where: { [key]: uniqueData[key] } });
            if (found) {
                errors.push({ property: key, constraints: { unique: \`\${key} must be unique\` } });
            }
        }

        if (errors.length > 0) {
            throw new UnprocessableEntityException({ errors });
        }

        return;
    }
        `;
    }

    protected printService() {
        return joinLines(
            `export class ${this.serviceName} {`,
            `    constructor(protected readonly repo: Prisma.${this.model.name}Delegate) {}`,
            ``,

            this.printIsUnqieuMethod(),
            `
            `,
            `   async findMany(query: ${this.queryDtoName}) {`,
            `       return await this.repo.findMany(normalize${this.queryDtoName}(query));`,
            `    }`,
            ``,
            ``,
            `   async createOne(data: ${this.createDtoName}) {`,
            `        await this.isUnique(data)`,
            `        return await this.repo.create({ data });`,
            `    }`,

            this.printFindByMethods(),
            this.printUpdateMethods(),
            this.printDeleteMethods(),

            this.printFindRelationMethods(),
            this.printCountMethods(),

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

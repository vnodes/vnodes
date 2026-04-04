import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';
import {
    extractPropOptions,
    isInputProp,
    isRelationProp,
    isSearchableField,
    parsePropOptions,
} from '@vnodes/prisma-plugin-helpers';
import { joinLines } from '@vnodes/utils';
import type { DtoGeneratorOptions } from '../types/dto-generator-options.js';
import { DtoPropertyPrinter } from './dto-property-printer.js';

export class DtoClassPrinter {
    protected readonly readDtoName: string;
    protected readonly createDtoName: string;
    protected readonly updateDtoName: string;
    protected readonly queryDtoName: string;

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

    protected printSearchQuery() {
        return this.model.fields
            .filter(isSearchableField)
            .map((e) => {
                return `{ ${e.name}: { contains: search, mode: 'insensitive' } }`;
            })
            .join(',');
    }
    protected printQueryDto() {
        return joinLines(
            `export class ${this.queryDtoName} extends PaginationDto {`,
            `    @Prop({ enum: Prisma.${this.model.name}ScalarFieldEnum }) orderBy?: Prisma.${this.model.name}ScalarFieldEnum;`,
            `    @Prop({ enum: Prisma.SortOrder }) orderDir?: Prisma.SortOrder;`,
            `    @Prop() search?: string;`,
            `    @Prop() withDeleted?: boolean;`,
            `}`,

            `export function normalize${this.model.name}QueryDto(query: ${this.model.name}QueryDto): SampleFindManyArgs {`,
            `    const { take, orderBy, orderDir, skip, search, withDeleted } = query;`,
            ``,
            `    const order: Prisma.${this.model.name}OrderByWithRelationInput | undefined = orderBy`,
            `        ? { [orderBy]: orderDir ?? 'asc' }`,
            `        : undefined;`,
            ``,
            `    const where: Prisma.${this.model.name}WhereInput | undefined = search`,
            `        ? {`,
            `              OR: [`,
            this.printSearchQuery(),
            `],`,
            `          }`,
            `        : undefined;`,
            `    return {`,
            `        take,`,
            `        skip,`,
            `        where,`,
            `        orderBy: order,`,
            `    };`,
            `}            `,
        );
    }

    print() {
        return joinLines(this.printReadDto(), this.printCreateDto(), this.printUpdateDto(), this.printQueryDto());
    }
}

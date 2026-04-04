import { DMMF } from "@prisma/generator-helper";

export function printQueryDtoClass(model: DMMF.Model) {

    return [
        `export class ${model.name}QueryDto {`,
        `    @Prop({ minimum: 1 }) take?: number;`,
        `    @Prop({ minimum: 0 }) skip?: number;`,
        `    @Prop({ enum: Prisma.${model.name}ScalarFieldEnum }) orderBy?: Prisma.${model.name}ScalarFieldEnum;`,
        `    @Prop({ enum: Prisma.SortOrder }) orderDir?: Prisma.SortOrder;`,
        `    @Prop() search?: string;`,
        `    @Prop() withDeleted?: boolean;`,
        `}`,

    ].join('\n\t')
}
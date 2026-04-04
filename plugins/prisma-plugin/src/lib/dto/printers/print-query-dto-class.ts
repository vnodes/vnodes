import { DMMF } from "@prisma/generator-helper";
import { joinLines } from "@vnodes/utils";

export function printQueryDtoClass(model: DMMF.Model) {

    return joinLines(
        `export class ${model.name}QueryDto {`,
        `    @Prop({ minimum: 1 }) take?: number;`,
        `    @Prop({ minimum: 0 }) skip?: number;`,
        `    @Prop({ enum: Prisma.${model.name}ScalarFieldEnum }) orderBy?: Prisma.${model.name}ScalarFieldEnum;`,
        `    @Prop({ enum: Prisma.SortOrder }) orderDir?: Prisma.SortOrder;`,
        `    @Prop() search?: string;`,
        `    @Prop() withDeleted?: boolean;`,
        `}`,
    )

}
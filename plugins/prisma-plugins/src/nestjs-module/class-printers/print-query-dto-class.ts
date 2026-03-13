import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printQueryDtoClass(model: DMMF.Model) {
    const { pascalCase } = names(model.name);
    return [
        `
export class ${pascalCase}QueryDto implements P.QueryMany<P.Prisma.${pascalCase}ScalarFieldEnum> {
    @Prop({ minimum: 0 }) take?: number;
    @Prop({ minimum: 0 }) skip?: number;
    @Prop() search?: string;
    @Prop({ enum: P.Prisma.${pascalCase}ScalarFieldEnum }) orderBy?: P.Prisma.${pascalCase}ScalarFieldEnum;
    @Prop({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}
`,
    ].join('\n');
}

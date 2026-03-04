import type { DMMF } from '@prisma/generator-helper';
import { names } from '@vnodes/names';

export function printQueryDtoClass(model: DMMF.Model) {
    const { pascalCase } = names(model.name);
    return [
        `
export class ${pascalCase}QueryDto implements P.QueryMany<P.Prisma.${pascalCase}ScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop() orderBy?: P.Prisma.${pascalCase}ScalarFieldEnum;
    @Prop() orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}
`,
    ].join('\n');
}

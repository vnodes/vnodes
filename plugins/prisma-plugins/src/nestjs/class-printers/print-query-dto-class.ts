import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from '../class/class-name-suffix.js';

export function printQueryDtoClass(model: DMMF.Model) {
    return [
        `export class ${model.name}${ClassNameSuffix.QueryDto} {`,
        `@Prop({ type: Number, format: 'int32', minimum: 0, default: 20, required: false }) take?: number;`,
        `@Prop({ type: Number, format: 'int32', minimum: 0, default: 0, required: false }) skip?: number;`,
        `@Prop({ type: String, required: false }) search?: string;`,
        `@Prop({ type: String, enum: P.Prisma.${model.name}ScalarFieldEnum, required: false, default: 'id' })`,
        `orderBy: P.Prisma.${model.name}ScalarFieldEnum;`,
        `@Prop({ type: String, enum: P.Prisma.SortOrder, required: false, default: 'asc' }) orderDir?: P.Prisma.SortOrder;`,
        `@Prop({ type: Boolean, default: false, required: false }) withDeleted?: boolean;`,
        '}',
    ].join('\n');
}

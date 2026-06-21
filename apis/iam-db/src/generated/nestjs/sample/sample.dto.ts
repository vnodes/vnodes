import { BaseQueryDto } from '@vnodes/prisma';
import { PartialType, Prop } from '@vnodes/prop';
import { Prisma } from '../../prisma/browser.js';

export const SampleField = Prisma.SampleScalarFieldEnum;
export type SampleField = keyof typeof SampleField;
export const SampleSearchFields: SampleField[] = [SampleField.name, SampleField.description];

export class SampleQueryDto extends BaseQueryDto {
  @Prop({ enum: Prisma.SampleScalarFieldEnum }) orderBy?: Prisma.SampleScalarFieldEnum;
  @Prop({ enum: Prisma.SortOrder }) orderDir?: Prisma.SortOrder;
  @Prop({ enum: Prisma.SampleScalarFieldEnum }) distinct?: Prisma.SampleScalarFieldEnum;
}

export class SampleCreateDto {
  @Prop({ required: true }) name: string;
  @Prop({}) description: string;
}
export class SampleUpdateDto extends PartialType(SampleCreateDto) {}

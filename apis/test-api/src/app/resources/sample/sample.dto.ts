import { PartialType } from '@nestjs/swagger';
import type { RelationParams, UnsetRelationParams } from '@vnodes/nest';
import { Prop } from '@vnodes/prop';
import { Prisma } from '@vnodes/test-db';

export class SampleCreateDto {
  @Prop({ required: true }) name: string;
}

export class SampleUpdateDto extends PartialType(SampleCreateDto) {}

export class SampleQueryDto {
  @Prop() take?: number;
  @Prop() skip?: number;
  @Prop({ enum: Object.keys(Prisma.SampleScalarFieldEnum) }) distinct?: Prisma.SampleScalarFieldEnum;
}

export class SampleProjectionDto {
  @Prop() id?: boolean;
  @Prop() name?: boolean;
}

export class SampleUnsetRelationDto implements UnsetRelationParams {
  @Prop({ required: true }) id: number;
  @Prop({ required: true }) relationName: string;
}

export class SampleRelationDto extends SampleUnsetRelationDto implements RelationParams {
  @Prop({ required: true }) relationId: number;
}

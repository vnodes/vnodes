import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@vnodes/prop';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SampleCreateDto {
  @Prop() name: string;
}

export class SampleCreateManyDto {
  @ApiProperty({ type: () => [SampleCreateDto] })
  @Type(() => SampleCreateDto)
  @ValidateNested()
  @Expose()
  data: SampleCreateDto[];
}

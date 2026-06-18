import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SampleCreateDto {
  @ApiProperty() @Expose() name: string;
}

export class SampleCreateManyDto {
  @ApiProperty({ type: () => [SampleCreateDto] })
  @Type(() => SampleCreateDto)
  @ValidateNested()
  @Expose()
  data: SampleCreateDto[];
}

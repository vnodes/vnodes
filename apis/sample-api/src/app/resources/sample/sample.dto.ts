import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SampleCreateDto {
  @ApiProperty() @IsString() name: string;
}

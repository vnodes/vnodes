import { ApiProperty, PartialType } from "@nestjs/swagger";
import { type Prisma, Status } from "@vnodes/todo";
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class TodoCreateDto implements Prisma.TodoCreateInput {
    @ApiProperty() @IsNotEmpty() title: string;
    @ApiProperty() @IsOptional() description?: string;
    @ApiProperty() @IsEnum(Status) status?: Status;
}

export class TodoUpdateDto extends PartialType(TodoCreateDto) {}

export class TodoQueryDto {
    @ApiProperty({ default: 3 }) @Min(1) @Max(500) take?: number;
    @ApiProperty({ default: 0 }) @Min(0) skip?: number;
    @ApiProperty() @IsNotEmpty() @IsOptional() search?: string;
}

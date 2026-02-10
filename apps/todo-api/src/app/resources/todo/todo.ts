import { PartialType } from "@nestjs/swagger";
import { Property, PropertyEnum } from "@vnodes/property";
import { type Prisma, Status } from "@vnodes/todo";

export class TodoCreateDto implements Prisma.TodoCreateInput {
    @Property() title: string;
    @Property() description?: string;
    @PropertyEnum({ enum: Status }) status?: Status;
}

export class TodoUpdateDto extends PartialType(TodoCreateDto) {}

export class TodoQueryDto {
    @Property() take?: number;
    @Property() skip?: number;
    @Property() search?: string;
}

import { PartialType, PickType } from "@nestjs/swagger";
import { Property } from "@vnodes/property";
import { Column, Entity } from "@vnodes/typeorm";

@Entity()
export class Todo {
    @Column({ type: "integer", primaryId: true }) id: number;
    @Column({ type: "date", timestamp: "created-at" }) createdAt: Date;
    @Column({ type: "date", timestamp: "updated-at" }) updatedAt: Date;
    @Column({ type: "date", timestamp: "deleted-at" }) deletedAt?: Date;
    @Column({ type: "string", required: true, unique: true }) title: string;
    @Column({ type: "string" }) description?: string;
}

export class TodoCreateDto extends PickType(Todo, ["title", "description"]) {}

export class TodoUpdateDto extends PartialType(TodoCreateDto) {}

export class TodoQueryDto {
    @Property({ type: "integer", min: 1, max: 400 }) take?: number;
    @Property({ type: "integer", min: 0 }) skip?: number;
}

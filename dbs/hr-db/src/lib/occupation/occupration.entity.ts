import { Column, Entity, TimestampEntity } from "@vnodes/typeorm";

@Entity()
export class Occupation extends TimestampEntity {
    @Column({ type: "string", required: true, unique: true }) name: string;
}

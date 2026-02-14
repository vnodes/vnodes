import { Column, Entity, TimestampEntity } from "@vnodes/typeorm";

@Entity()
export class Country extends TimestampEntity {
    @Column({ type: "string", unique: true, required: true }) name: string;
}

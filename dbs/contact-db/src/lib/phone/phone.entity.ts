import { Column, Entity, TimestampEntity, Unique } from "@vnodes/typeorm";

@Entity()
@Unique(["userId", "phone"])
export class Phone extends TimestampEntity {
    @Column({ type: "string", format: "uuid7" }) userId: string;
    @Column({ type: "string", format: "phone", unique: true, required: true }) phone: string;
}

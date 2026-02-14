import { Column, Entity, TimestampEntity, Unique } from "@vnodes/typeorm";

@Entity()
@Unique(["userId", "email"])
export class Email extends TimestampEntity {
    @Column({ type: "string", format: "uuid7" }) userId: string;
    @Column({ type: "string", unique: true, required: true }) email: string;
}

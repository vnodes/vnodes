import { Column, Entity, TimestampEntity } from "@vnodes/typeorm";

@Entity()
export class EmployeeDetail extends TimestampEntity {
    @Column({ type: "string", required: true, encrypt: true }) ssn: string;
}

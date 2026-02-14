import { Column, Entity, Relation, TimestampEntity } from "@vnodes/typeorm";
import { Occupation } from "../occupation/occupration.entity.js";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

@Entity()
export class Employee extends TimestampEntity {
    @Column({ type: "string", required: true }) firstName: string;
    @Column({ type: "string", required: true }) lastName: string;
    @Column({ type: "string" }) middleName?: string;
    @Column({ type: "string", required: true }) gender: Gender;
    @Column({ type: "string", required: true }) dob: Date;

    @Relation({ type: "many-to-one", target: Occupation }) occupation: Occupation;
}

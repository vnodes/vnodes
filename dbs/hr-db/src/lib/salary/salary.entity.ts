import { Column, Entity, Relation, TimestampEntity } from "@vnodes/typeorm";
import { Employee } from "../employee/employee.entity.js";

@Entity()
export class Salary extends TimestampEntity {
    @Column({ type: "date", required: true }) startDate: Date;
    @Column({ type: "date", required: true }) endDate?: Date;
    @Column({ type: "number", required: true }) salary?: number;
    @Relation({ type: "many-to-one", target: Employee }) employee: Employee;
}

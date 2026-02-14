import { Entity, Relation, TimestampEntity } from "@vnodes/typeorm";
import { Employee } from "../employee/employee.entity.js";
import { Salary } from "../salary/salary.entity.js";

@Entity()
export class CurrentSalary extends TimestampEntity {
    @Relation({ type: "one-to-one", target: Salary, eager: true }) salary: Salary;
    @Relation({ type: "one-to-one", target: Employee }) employee: Employee;
}

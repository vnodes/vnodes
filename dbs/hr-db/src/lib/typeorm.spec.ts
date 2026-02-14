import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { DataSource } from "typeorm";
import { CurrentSalary } from "./current-salary/current-salary.entity";
import { Employee } from "./employee/employee.entity";
import { EmployeeDetail } from "./employee-detail/employee-detail.entity";
import { Occupation } from "./occupation/occupration.entity";
import { Salary } from "./salary/salary.entity";

describe("Typeorm", async () => {
    test("should initialize", async () => {
        const ds = await new DataSource({
            type: "postgres",
            database: "pms",
            port: 5432,
            username: "admin",
            password: "password",
            entities: [CurrentSalary, Employee, EmployeeDetail, Occupation, Salary],
            synchronize: true,
            dropSchema: true,
        }).initialize();

        assert.ok(ds);
    });
});

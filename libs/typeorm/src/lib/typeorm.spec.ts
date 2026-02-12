import test, { describe } from "node:test";
import { DataSource } from "typeorm";
import { Category } from "./samples/category.entity";
import { Sample, Status } from "./samples/sample.entity";

describe("typeorm", () => {
    test("should work", async () => {
        const ds = new DataSource({
            type: "postgres",
            database: "pms",
            username: "admin",
            password: "password",
            port: 5432,
            host: "localhost",
            entities: [Sample, Category],
            synchronize: true,
            dropSchema: true,
        });

        await ds.initialize();

        const sample = ds.getRepository(Sample);
        const category = ds.getRepository(Category);

        const savedCategory = await category.save({ name: "cat 1" });

        const saved = await sample.save({
            stringArrayValue: ["1", "2", "3"],
            numberArrrayValue: [1, 2, 3, 4],
            booleanValue: true,
            integetValue: 123,
            jsonValue: {
                key: "key",
                value: "value",
            },
            numberValue: 0.0012,
            textValue: "Some longs text goes here",
            enumValue: Status.ACTIVE,
        });

        console.log(saved);

        setTimeout(async () => {
            const found = await sample.find({});

            console.log(found);
        }, 1000);
    });
});

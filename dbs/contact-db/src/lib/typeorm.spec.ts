import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { DataSource } from "typeorm";
import { Address } from "./address/addresss.entity";
import { Country } from "./country/country.entity";
import { Email } from "./email/email.entity";
import { Phone } from "./phone/phone.entity";
import { State } from "./state/state.entity";

describe("Typeorm", async () => {
    test("should initialize", async () => {
        const ds = await new DataSource({
            type: "postgres",
            database: "pms",
            port: 5432,
            username: "admin",
            password: "password",
            entities: [Country, State, Address, Email, Phone],
            synchronize: true,
            dropSchema: true,
        }).initialize();

        assert.ok(ds);
    });
});

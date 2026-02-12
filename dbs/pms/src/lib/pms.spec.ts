import { describe, test } from "node:test";
import { pms } from "./pms";

describe("pms", () => {
    test("should connect", async () => {
        await pms();
    });
});

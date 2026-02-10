import assert from "node:assert";
import { describe, it } from "node:test";
import { getResourceName } from "./get-resource-name.js";

describe("getResourceName", () => {
    it("should work", () => {
        assert.equal(getResourceName("SomeController"), "Some");
        assert.equal(getResourceName("SomeService"), "Some");
        assert.equal(getResourceName("SomeModule"), "Some");
        assert.equal(getResourceName("SomeEventListener"), "Some");
    });
});

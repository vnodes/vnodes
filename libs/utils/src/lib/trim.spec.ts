import assert from "node:assert";
import { describe, test } from "node:test";
import { trim } from "./trim";

describe("trim", () => {
    //
    test("should trim", () => {
        assert.equal(trim("some"), "some");
        assert.equal(trim("some   "), "some");
        assert.equal(trim("   some   "), "some");
        assert.equal(trim("   some other   "), "some other");
        assert.equal(trim("   some    other   "), "some other");
    });
});

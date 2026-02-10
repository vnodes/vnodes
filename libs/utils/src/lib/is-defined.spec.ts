import assert from "node:assert";
import test, { describe } from "node:test";
import { isDefined } from "./is-defined.js";

describe("isDefined", () => {
    test("should work", () => {
        assert.strictEqual(isDefined(1), true);
        assert.strictEqual(isDefined(""), true);
        assert.strictEqual(isDefined(-1), true);
        assert.strictEqual(isDefined(NaN), true);
        assert.strictEqual(isDefined(null), false);
        assert.strictEqual(isDefined(undefined), false);
    });
});

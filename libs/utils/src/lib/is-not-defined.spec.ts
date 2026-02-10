import assert from "node:assert";
import test, { describe } from "node:test";
import { isNotDefined } from "./is-not-defined.js";

describe("isNotDefined", () => {
    test("should work", () => {
        assert.strictEqual(isNotDefined(1), false);
        assert.strictEqual(isNotDefined(""), false);
        assert.strictEqual(isNotDefined(-1), false);
        assert.strictEqual(isNotDefined(NaN), false);
        assert.strictEqual(isNotDefined(null), true);
        assert.strictEqual(isNotDefined(undefined), true);
    });
});

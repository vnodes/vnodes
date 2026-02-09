import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { createMetadata } from "./create-metadata.js";

// 1. Setup the metadata helpers
const { classMetadata, methodMetadata, getAll, getAllAndOverride, token } = createMetadata<string>("test_group");

// 2. Define decorated classes at the TOP LEVEL
@classMetadata("class-val")
class TestController {
    @methodMetadata("method-val")
    testMethod() {}
}

describe("createMetadata", () => {
    const reflector = new Reflector();

    // Mock ExecutionContext
    const mockContext = {
        getClass: () => TestController,
        getHandler: () => TestController.prototype.testMethod,
    } as unknown as ExecutionContext;

    describe("Decorators", () => {
        it("should apply class metadata with the correct token", () => {
            // The token generated internally is "default_test_group"
            const metadata = Reflect.getMetadata(token(), TestController);
            assert.strictEqual(metadata, "class-val");
        });

        it("should apply method metadata with the correct token", () => {
            const metadata = Reflect.getMetadata(token(), TestController.prototype.testMethod);
            assert.strictEqual(metadata, "method-val");
        });
    });

    describe("Retrieval Helpers", () => {
        it("getAll should return both class and method metadata", () => {
            const result = getAll(reflector, mockContext);
            assert.deepStrictEqual(result, ["class-val", "method-val"]);
        });

        it("getAllAndOverride should prioritize method metadata", () => {
            const result = getAllAndOverride(reflector, mockContext);
            assert.strictEqual(result, "method-val");
        });
    });

    describe("Custom Naming", () => {
        it("should support custom names for tokens", () => {
            const custom = createMetadata<number>("custom_group");

            @custom.classMetadata(123, "my_key")
            class CustomClass {}

            const metadata = Reflect.getMetadata(custom.token("my_key"), CustomClass);
            assert.strictEqual(metadata, 123);
        });
    });
});

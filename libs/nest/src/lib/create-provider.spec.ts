import assert from "node:assert/strict";
import test, { before, describe } from "node:test";
import { Test, type TestingModule } from "@nestjs/testing";
import { createProvider } from "./create-provider.js";

describe("create-provider", () => {
    describe("value provider", () => {
        const { provideValue, token } = createProvider<string>();
        let context: TestingModule;
        before(async () => {
            context = await Test.createTestingModule({ providers: [provideValue("hello")] }).compile();
        });
        test("should inject the value", () => {
            assert.equal(context.get(token()), "hello");
        });
    });

    describe("class provider", () => {
        class A {}
        const { provideClass, token } = createProvider<A>();
        let context: TestingModule;
        before(async () => {
            context = await Test.createTestingModule({ providers: [provideClass(A)] }).compile();
        });
        test("should inject the value", () => {
            assert.ok(context.get(token()) instanceof A);
        });
    });

    describe("factory provider", () => {
        class A {}
        const { provideFactory, token } = createProvider<A>();
        let context: TestingModule;
        before(async () => {
            context = await Test.createTestingModule({
                providers: [
                    provideFactory(() => {
                        return new A();
                    }),
                ],
            }).compile();
        });
        test("should inject the value", () => {
            assert.ok(context.get(token()) instanceof A);
        });
    });
});

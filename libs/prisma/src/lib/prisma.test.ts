import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { prisma } from "./prisma.js";

describe("prisma", () => {
    before(() => {
        console.log("Before test");
    });
    after(() => {
        console.log("After test");
    });
    test("should return prisma", () => {
        assert.equal(prisma(), "prisma");
    });
    test("should return prisma another test", () => {
        assert.equal(prisma(), "prisma");
    });
});

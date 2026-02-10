import { describe, it } from "node:test";
import { Controller } from "./controller.js";

describe("Controller", () => {
    it("should decorator", () => {
        @Controller()
        class Sample {
            find() {}
            create() {}
            udpate() {}
            delete() {}
        }
    });
});

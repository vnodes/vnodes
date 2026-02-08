import { InvalidResourceNameError } from "@vnodes/errors";
import { NestClassType } from "@vnodes/types";
import { classTypeExp } from "./class-type.js";

export function validateClassName(className: string) {
    if (classTypeExp.test(className)) {
        return true;
    }

    throw new InvalidResourceNameError(
        `The resource name must end with ${NestClassType} and start with the resouce name`,
        { className },
    );
}

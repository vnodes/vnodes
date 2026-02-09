import { InvalidResourceNameError } from "@vnodes/errors";
import { ClassType } from "@vnodes/types";
import { classTypeExp } from "./class-type.js";

export function validateClassName(className: string) {
    if (classTypeExp.test(className)) {
        return true;
    }

    throw new InvalidResourceNameError(`The resource name must end with ${ClassType} and start with the resouce name`, {
        className,
    });
}

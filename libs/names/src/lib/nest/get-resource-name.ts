import { classTypeExp } from "./class-type.js";

export function getResourceName(className: string) {
    return className.replace(classTypeExp, "");
}

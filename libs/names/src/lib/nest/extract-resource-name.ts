import { nestClassNameSuffixExp } from "./nest-class-name-suffix.js";

export function extractNestResourceName(className: string) {
    return className.replace(nestClassNameSuffixExp, "");
}

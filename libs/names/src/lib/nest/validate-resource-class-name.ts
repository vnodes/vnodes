import { NestClassNameSuffix, nestClassNameSuffixExp, nestClassNameSuffixes } from "./nest-class-name-suffix.js";

export function validateResourceClassName(className: string) {
    if (nestClassNameSuffixExp.test(className) && !nestClassNameSuffixes.includes(className as NestClassNameSuffix)) {
        return true;
    }

    throw new Error(`The resource name must end with ${NestClassNameSuffix} and start with the resouce name`);
}

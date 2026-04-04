import { DMMF } from "@prisma/generator-helper";
import { isRelationProp } from "./is-relation-prop.js";
import { ParsedPropOptions } from "./parse-prop-options.js";
import { isTimestampProp } from "./is-timestamp-prop.js";

export function isInputProp(field: DMMF.Field, propOptions: ParsedPropOptions) {

    if (field.isId) {
        return false;
    }

    if (field.isGenerated) {
        return false;
    }

    if (isRelationProp(field)) {
        return false
    }

    if (isTimestampProp(field, propOptions)) {
        return false

    }


    return true;
}
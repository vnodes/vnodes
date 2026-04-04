import { DMMF } from "@prisma/generator-helper";
import { ParsedPropOptions } from "./parse-prop-options.js"

export function isTimestampProp(field: DMMF.Field, propOptions: ParsedPropOptions) {

    if (field.kind === 'scalar') {
        if (field.type === "DateTime") {
            return /^createdat|updatedat|deletedat$/i.test(field.name)
        }
    }
    return false;
}
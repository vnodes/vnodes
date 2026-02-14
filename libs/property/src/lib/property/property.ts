import { ApiProperty } from "@nestjs/swagger";
import type { PropertyOptions } from "@vnodes/types";
import type { ValidationOptions } from "class-validator";
import { toApiPropertyOptions } from "../helpers/to-api-property-options.js";
import { ArrayProperty } from "./array-property.js";
import { BooleanProperty } from "./boolean-property.js";
import { CommonProperty } from "./common-property.js";
import { DateProperty } from "./date-property.js";
import { EnumProperty } from "./enum-property.js";
import { IntegerProperty } from "./integer-property.js";
import { JsonProperty } from "./json-property.js";
import { NumberProperty } from "./number-property.js";
import { ObjectProperty } from "./object-property.js";
import { StringProperty } from "./string-property.js";

export function Property(options: PropertyOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return (...args) => {
        CommonProperty(options, validationOptions)(...args);

        ApiProperty(toApiPropertyOptions(options))(...args);

        switch (options.type) {
            case "string": {
                StringProperty(options, validationOptions)(...args);
                break;
            }
            case "number": {
                NumberProperty(options, validationOptions)(...args);
                break;
            }

            case "integer": {
                IntegerProperty(options, validationOptions)(...args);
                break;
            }
            case "boolean": {
                BooleanProperty(options, validationOptions)(...args);
                break;
            }
            case "object": {
                ObjectProperty(options, validationOptions)(...args);
                break;
            }
            case "enum": {
                EnumProperty(options, validationOptions)(...args);

                break;
            }
            case "json": {
                JsonProperty(options, validationOptions)(...args);
                break;
            }
            case "date": {
                DateProperty(options, validationOptions)(...args);
                break;
            }
            case "array": {
                ArrayProperty(options)(...args);
                Property(options.items, { each: true })(...args);
                break;
            }
        }
    };
}

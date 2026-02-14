import type { ApiPropertyOptions } from "@nestjs/swagger";
import type { PropertyOptions } from "@vnodes/types";

export function toApiPropertyOptions(options: PropertyOptions): ApiPropertyOptions {
    const required = options.required === true;

    return {
        required,
    };
}

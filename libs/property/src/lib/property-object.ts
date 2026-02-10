import { ApiProperty, type ApiPropertyOptions } from "@nestjs/swagger";
import type { Cls } from "@vnodes/types";
import { Type } from "class-transformer";
import type { ValidationOptions } from "class-validator";
import { IsOptional, ValidateNested } from "class-validator";
import { normalizePropertyOptions } from "./normalize-property-options.js";

export function PropertyObject(options: ApiPropertyOptions & { type: Cls }): PropertyDecorator {
    return (...args) => {
        const { required, isArray } = normalizePropertyOptions(options);
        const voptions: ValidationOptions = { each: isArray === true };
        ValidateNested(voptions)(...args);
        Type(() => options.type)(...args);

        if (required !== true) IsOptional()(...args);
        ApiProperty({ ...options })(...args);
    };
}

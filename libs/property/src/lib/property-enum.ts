import { ApiProperty, type ApiPropertyOptions } from "@nestjs/swagger";
import type { Any } from "@vnodes/types";
import type { ValidationOptions } from "class-validator";
import { IsEnum, IsOptional } from "class-validator";
import { normalizePropertyOptions } from "./normalize-property-options.js";

export function PropertyEnum(options: ApiPropertyOptions & { enum: Any }): PropertyDecorator {
    return (...args) => {
        const { required, isArray } = normalizePropertyOptions(options);
        const voptions: ValidationOptions = { each: isArray === true };

        if (required !== true) IsOptional()(...args);

        IsEnum(options.enum, voptions)(...args);
        ApiProperty({ ...options })(...args);
    };
}

import type { PropertyOptions } from "@vnodes/metadata";

import type { ColumnOptions } from "typeorm";

export function toColumnOptions(options: PropertyOptions): ColumnOptions {
    const common: ColumnOptions = {
        unique: options.unique === true,
        nullable: !(options.requried === true),
        select: !(options.internal === true),
        comment: options.description,
        default: options.default,
        update: !(options.readonly === true),
    };

    switch (options.type) {
        case "string": {
            return {
                type: "text",
                ...common,
            };
        }
        case "number": {
            return {
                type: "numeric",
                precision: options.precision ?? 19,
                scale: options.scale ?? 4,
                ...common,
            };
        }

        case "integer": {
            return {
                type: "int",
                ...common,
            };
        }
        case "boolean": {
            return {
                type: "boolean",
                ...common,
            };
        }
        case "enum": {
            return {
                type: "enum",
                enum: options.enum,
                ...common,
            };
        }
        case "array": {
            const arrayItemsOptions = toColumnOptions(options.items);
            return {
                type: arrayItemsOptions.type,
                array: true,
                ...common,
            };
        }
        case "json": {
            return {
                type: "jsonb",
                ...common,
            };
        }
    }
}

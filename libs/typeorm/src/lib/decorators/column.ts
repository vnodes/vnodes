import type { PropertyOptions } from "@vnodes/metadata";
import { Column as TypeormColumn } from "typeorm";
import { toColumnOptions } from "../helpers/to-column-options.js";

export function Column(options: PropertyOptions): PropertyDecorator {
    return (...args) => {
        TypeormColumn(toColumnOptions(options))(...args);
    };
}

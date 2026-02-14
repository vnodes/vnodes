import { Property } from "@vnodes/property";
import type { PropertyOptions } from "@vnodes/types";
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    Column as TypeormColumn,
    UpdateDateColumn,
} from "typeorm";
import { toColumnOptions } from "../helpers/to-column-options.js";

export function Column(options: PropertyOptions): PropertyDecorator {
    return (...args) => {
        Property(options)(...args);

        if (options.type === "date" && options.timestamp) {
            switch (options.timestamp) {
                case "created-at": {
                    CreateDateColumn()(...args);
                    break;
                }
                case "updated-at": {
                    UpdateDateColumn()(...args);
                    break;
                }
                case "deleted-at": {
                    DeleteDateColumn()(...args);
                    break;
                }
            }
        } else if (options.type === "integer") {
            if (options.primaryId) {
                PrimaryGeneratedColumn()(...args);
            }
        } else {
            TypeormColumn(toColumnOptions(options))(...args);
        }
    };
}

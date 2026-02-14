import { Property } from "@vnodes/property";
import type { RelationOptions } from "@vnodes/types";
import {
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    type RelationOptions as TRelationOptions,
} from "typeorm";
import { toPropertyOptions } from "../helpers/to-property-options.js";

export function Relation(options: RelationOptions): PropertyDecorator {
    return (...args) => {
        const relationOptions: TRelationOptions = {
            cascade: options.cascade ?? ["insert"],
            eager: options.eager !== false,
            nullable: options.nullable !== false,
            onDelete: options.onDelete,
            onUpdate: options.onUpdate,
        };

        const joinOptions = options.joinBy
            ? {
                  name: options.joinBy,
              }
            : {};

        switch (options.type) {
            case "many-to-many":
            case "one-to-many": {
                switch (options.type) {
                    case "many-to-many": {
                        ManyToMany(() => options.target, relationOptions)(...args);
                        break;
                    }
                    case "one-to-many": {
                        if (!options.inverseSide) {
                            throw new Error("options.inverseSide is required!");
                        }

                        OneToMany(() => options.target, options.inverseSide, relationOptions)(...args);
                        break;
                    }
                }

                break;
            }
            case "one-to-one": {
                OneToOne(() => options.target, relationOptions)(...args);
                break;
            }
            case "many-to-one": {
                ManyToOne(() => options.target, relationOptions)(...args);
                break;
            }
        }

        if (options.join || options.joinBy)
            switch (options.type) {
                case "many-to-many":
                case "one-to-many": {
                    JoinTable(joinOptions)(...args);

                    break;
                }
                case "one-to-one":
                case "many-to-one": {
                    JoinColumn(joinOptions)(...args);
                    break;
                }
            }

        const propertyOPtions = toPropertyOptions(options);

        Property(propertyOPtions)(...args);
    };
}

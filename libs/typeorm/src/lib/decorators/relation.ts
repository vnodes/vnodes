import type { RelationOptions } from "@vnodes/metadata";
import {
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    type RelationOptions as TRelationOptions,
} from "typeorm";

export function Relation(options: RelationOptions): PropertyDecorator {
    return (...args) => {
        const relationClass = options.target;
        const common: TRelationOptions = {
            cascade: options.cascade,
            eager: true,
            nullable: true,
            onDelete: options.onDelete,
            onUpdate: options.onUpdate,
        };

        switch (options.type) {
            case "many-to-many": {
                ManyToMany(() => relationClass, { ...common })(...args);
                break;
            }
            case "many-to-one": {
                ManyToOne(() => relationClass, { ...common })(...args);
                break;
            }
            case "one-to-one": {
                OneToOne(() => relationClass, { ...common })(...args);
                break;
            }
            case "one-to-many": {
                const inverse = options.inverseColumn;
                if (inverse !== undefined) {
                    OneToMany(
                        () => relationClass,
                        (e) => e[inverse],
                    )(...args);
                } else {
                    throw new Error("options.inverseColumn is requried!");
                }

                break;
            }
        }

        // Joins

        if (options.join === true || options.joinBy)
            switch (options.type) {
                case "many-to-many":
                case "one-to-many": {
                    if (options.join === true) {
                        JoinTable()(...args);
                    } else if (options.joinBy !== undefined) {
                        JoinTable({ name: options.joinBy })(...args);
                    }
                    break;
                }
                case "many-to-one":
                case "one-to-one": {
                    if (options.join === true) {
                        JoinColumn()(...args);
                    } else if (options.joinBy !== undefined) {
                        JoinColumn({ name: options.joinBy })(...args);
                    }
                    break;
                }
            }
    };
}

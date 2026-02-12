import { Column } from "typeorm";
import { UuidTransformer } from "../transformer/uuid-transformer.js";

export function UuidColumn(): PropertyDecorator {
    return (...args) => {
        Column({
            type: "uuid",
            unique: true,
            transformer: new UuidTransformer(),
        })(...args);
    };
}

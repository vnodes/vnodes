import "reflect-metadata";
import type { Any } from "@vnodes/types";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "../decorators/column.js";
import { Relation } from "../decorators/relation.js";
import { UuidColumn } from "../decorators/uuid-column.js";
import { Category } from "./category.entity.js";

export enum Status {
    ACTIVE = "ACTIVE",
    PASSIVE = "PASSIVE",
}

@Entity()
export class Sample {
    @PrimaryGeneratedColumn() id: number;

    @UuidColumn() uuid?: string;

    @Column({ type: "string", unique: true, requried: true, hash: true })
    textValue: string;

    @Column({ type: "number" }) numberValue?: number;
    @Column({ type: "integer" }) integetValue?: number;
    @Column({ type: "boolean" }) booleanValue?: boolean;
    @Column({ type: "array", items: { type: "string" } }) stringArrayValue?: string[];
    @Column({ type: "array", items: { type: "number" } }) numberArrrayValue?: number[];
    @Column({ type: "json" }) jsonValue?: Record<string, Any>;
    @Column({ type: "enum", enum: Status }) enumValue?: Status;
    @Relation({ type: "many-to-one", target: Category }) category?: Category;
}

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { IdEntity } from "./id.entity.js";

export class TimestampEntity extends IdEntity {
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
    @DeleteDateColumn() deletedAt: Date;
}

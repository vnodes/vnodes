import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "../decorators/column.js";

@Entity()
export class Category {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: "string", unique: true }) name: string;
}

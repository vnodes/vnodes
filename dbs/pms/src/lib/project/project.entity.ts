import { Column, Entity } from "typeorm";
import { TimestampEntity } from "../common/timestamp.entity.js";

@Entity()
export class Project extends TimestampEntity {
    @Column({ type: "varchar", length: 255, unique: true }) name: string;
    @Column({ type: "varchar", length: 255, nullable: true }) slug?: string;
    @Column({ type: "text", nullable: true }) description?: string;
}

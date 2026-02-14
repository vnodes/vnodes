import { Column, Entity, Relation, TimestampEntity } from "@vnodes/typeorm";
import { Country } from "../country/country.entity.js";

@Entity()
export class State extends TimestampEntity {
    @Column({ type: "string", unique: true, required: true }) name: string;
    @Relation({ type: "many-to-one", target: Country, required: true }) country: Country;
}

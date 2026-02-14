import { Column, Entity, Relation, TimestampEntity, Unique } from "@vnodes/typeorm";
import { Country } from "../country/country.entity.js";
import { State } from "../state/state.entity.js";

@Entity()
@Unique(["userId", "street", "city", "zip", "state", "country"])
export class Address extends TimestampEntity {
    @Column({ type: "string", format: "uuid7" }) userId: string;
    @Column({ type: "string", required: true })
    street: string;
    @Column({ type: "string", required: true }) city: string;
    @Column({ type: "string", required: true }) zip: string;

    @Relation({ type: "many-to-one", target: State, required: true, eager: true }) state?: State;
    @Relation({ type: "many-to-one", target: Country, required: true, eager: true }) country: Country;
}

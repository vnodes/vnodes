import { Property } from "@vnodes/property";

export class IdObjectDto {
    @Property({ type: "integer", required: true }) id: number;
}

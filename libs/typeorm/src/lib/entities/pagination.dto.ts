import { Property } from "@vnodes/property";

export class PaginationDto {
    @Property({ type: "integer", min: 1 }) take?: number;
    @Property({ type: "integer", min: 0 }) skip?: number;
}

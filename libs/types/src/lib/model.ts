import type { PropertyOptions } from "./property-options.js";
import type { RelationOptions } from "./relation-options.js";

export type Model<ModelName extends string = string, PropertyName extends string = string> = {
    name: ModelName;
    extends?: ModelName[];
    properties?: Record<PropertyName, PropertyOptions>;
    relations?: Record<PropertyName, RelationOptions<ModelName>>;
    uniques?: PropertyName[][];
    indexes?: PropertyName[][];
};

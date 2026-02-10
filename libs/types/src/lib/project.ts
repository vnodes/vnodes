import type { Model } from "./model.js";

export type Project<ModelName extends string, PropertyName extends string> = {
    name: string;
    models: Record<ModelName, Model<ModelName, PropertyName>>;
};

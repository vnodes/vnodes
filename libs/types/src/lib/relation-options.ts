export type RelationType = "many-to-many" | "many-to-one" | "one-to-many" | "one-to-one";

export type OnDelete = "CASCADE" | "NO ACTION";
export type OnUpdate = OnDelete;

export type RelationOptions<ModelName extends string> = {
    type: RelationType;
    model: ModelName;
    required?: boolean;
    onDelete?: OnDelete;
    onUpdate?: OnDelete;
};

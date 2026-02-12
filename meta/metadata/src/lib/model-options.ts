import type { Any, Cls } from "@vnodes/types";

export type PropertyType = "string" | "number" | "integer" | "boolean" | "enum" | "json" | "array";

export type PropertyTypeOptions = {
    type: PropertyType;
};

export type CommonPropertyOptions = {
    name?: string;
    requried?: boolean;
    description?: string;
    unique?: boolean;
    inputType?: string;
    label?: string;
    prefixText?: string;
    suffixText?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    readonly?: boolean;
    internal?: boolean;
    hash?: boolean;
    encrypt?: boolean;
};

export type GeneratedString = "uuid";

export type StringPropertyOptions = {
    type: "string";
    minLength?: number;
    maxLength?: number;
    default?: string;
    generated?: GeneratedString;
};

export type CommonNumberPropertyOptions =
    | {
          min?: number;
          max?: number;
      }
    | CommonPropertyOptions;

export type NumberPropertyOptions = {
    type: "number";
    default?: number;
    precision?: number;
    scale?: number;
} & CommonNumberPropertyOptions;

export type Interval = "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "milisecond";

export type IntegerPropertyOptions = {
    type: "integer";
    default?: number;
    interval?: Interval;
} & CommonNumberPropertyOptions;

export type BooleanPropertyOptions = {
    type: "boolean";
    default?: boolean;
};

export type EnumPropertyOptions<T = Any> = {
    type: "enum";
    enum: T;
    default?: T;
};

export type JsonPropertyOptions = {
    type: "json";
    default?: Any;
};

export type PrimitivePropertyOptions = CommonPropertyOptions &
    (
        | StringPropertyOptions
        | NumberPropertyOptions
        | IntegerPropertyOptions
        | BooleanPropertyOptions
        | EnumPropertyOptions
        | JsonPropertyOptions
    );

export type ReferArrayPropertyOptions<T extends { default?: Any }, D = T["default"]> = {
    type: "array";
    minArrayLength?: number;
    maxArrayLength?: number;
    items: T;
    default?: D[];
    uniqueItems?: boolean;
};

export type ArrayStringPropertyOptions = ReferArrayPropertyOptions<StringPropertyOptions>;
export type ArrayNumberPropertyOptions = ReferArrayPropertyOptions<NumberPropertyOptions>;
export type ArrayIntegerPropertyOptions = ReferArrayPropertyOptions<IntegerPropertyOptions>;
export type ArrayBooleanPropertyOptions = ReferArrayPropertyOptions<BooleanPropertyOptions>;
export type ArrayEnumPropertyOptions = ReferArrayPropertyOptions<EnumPropertyOptions>;
export type ArrayJsonPropertyOptions = ReferArrayPropertyOptions<JsonPropertyOptions>;
export type ArrayArrayPropertyOptions = ReferArrayPropertyOptions<
    ReferArrayPropertyOptions<
        ReferArrayPropertyOptions<ReferArrayPropertyOptions<ReferArrayPropertyOptions<ReferArrayPropertyOptions<Any>>>>
    >
>;

export type ArrayPropertyOptions =
    | ArrayStringPropertyOptions
    | ArrayNumberPropertyOptions
    | ArrayIntegerPropertyOptions
    | ArrayBooleanPropertyOptions
    | ArrayEnumPropertyOptions
    | ArrayJsonPropertyOptions;

export type PropertyOptions = CommonPropertyOptions & (PrimitivePropertyOptions | ArrayPropertyOptions);

export type ReferPropertyOptions<T extends PropertyType> = PropertyOptions & { type: T };

// Relation options

export type RelationType = "many-to-many" | "one-to-many" | "one-to-one" | "one-to-many";
export type OnActionType = "RESTRICT" | "CASCADE" | "SET NULL" | "DEFAULT" | "NO ACTION";

export type CascadeType = boolean | ("insert" | "update" | "remove" | "soft-remove" | "recover")[];
export type CommonRelationOptions = {
    target: Cls;
    join?: boolean;
    joinBy?: string;
    onDelete?: OnActionType;
    onUpdate?: OnActionType;
    eager?: boolean;
    nullable?: boolean;
    cascade?: CascadeType;
    inverseColumn?: string;
};

export type ManyToManyRelationOptions = { type: "many-to-many" } & CommonRelationOptions;
export type ManyToOneRelationOptions = { type: "many-to-one" } & CommonRelationOptions;
export type OneToOneRelationOptions = { type: "one-to-one" } & CommonRelationOptions;
export type OneToManyRelationOptions = { type: "one-to-many" } & CommonRelationOptions;

export type RelationOptions =
    | ManyToManyRelationOptions
    | ManyToOneRelationOptions
    | OneToOneRelationOptions
    | OneToManyRelationOptions;

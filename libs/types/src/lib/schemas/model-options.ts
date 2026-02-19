import type { Any, Cls, KeyOf, Keys } from '@vnodes/types';

export type PropertyType = 'string' | 'number' | 'integer' | 'boolean' | 'date' | 'enum' | 'object' | 'json' | 'array';

export type PropertyTypeOptions = {
    type: PropertyType | object;
};

export type CommonPropertyOptions = {
    name?: string;
    required?: boolean;
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
    format?: string;
};

export type GeneratedString = 'uuid';

export type StringPropertyOptions = {
    type: 'string';
    minLength?: number;
    maxLength?: number;
    default?: string;
    generated?: GeneratedString;
    isIn?: string[];
};

export type CommonNumberPropertyOptions = {
    min?: number;
    max?: number;
} & CommonPropertyOptions;

export type NumberPropertyOptions = {
    type: 'number';
    default?: number;
    precision?: number;
    scale?: number;
} & CommonNumberPropertyOptions;

export type Interval = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'milisecond';

export type IntegerPropertyOptions = {
    type: 'integer';
    default?: number;
    interval?: Interval;
    primaryId?: boolean;
} & CommonNumberPropertyOptions;

export type BooleanPropertyOptions = {
    type: 'boolean';
    default?: boolean;
};

export type DatePropertyOptions = {
    type: 'date';
    default?: Date;
    timestamp?: 'created-at' | 'updated-at' | 'deleted-at';
};

export type EnumPropertyOptions<T = Any> = {
    type: 'enum';
    enum: T;
    default?: T;
};

export type JsonPropertyOptions = {
    type: 'json';
    target?: Cls;
    default?: Any;
};

export type ObjectPropertyOptions = {
    type: 'object';
    default?: Any;
    target: Cls;
};

export type PrimitivePropertyOptions = CommonPropertyOptions &
    (
        | StringPropertyOptions
        | NumberPropertyOptions
        | IntegerPropertyOptions
        | BooleanPropertyOptions
        | EnumPropertyOptions
        | JsonPropertyOptions
        | DatePropertyOptions
        | ObjectPropertyOptions
    );

export type ReferArrayPropertyOptions<T extends { default?: Any }, D = T['default']> = {
    type: 'array';
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
export type ArrayDatePropertyOptions = ReferArrayPropertyOptions<DatePropertyOptions>;
export type ArrayObjectPropertyOptions = ReferArrayPropertyOptions<ObjectPropertyOptions>;
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
    | ArrayJsonPropertyOptions
    | ArrayDatePropertyOptions
    | ArrayObjectPropertyOptions;

export type PropertyOptions = CommonPropertyOptions & (PrimitivePropertyOptions | ArrayPropertyOptions);

export type ReferPropertyOptions<T extends PropertyType> = PropertyOptions & { type: T };

// Relation options

export type RelationType = 'many-to-many' | 'one-to-many' | 'one-to-one' | 'many-to-one';

export type OnActionType = 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'DEFAULT' | 'NO ACTION';

export type CascadeType = boolean | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[];

export type RelationOptions<T = Any> = {
    type: RelationType;
    target: Cls<T>;
    join?: boolean;
    joinBy?: string;
    onDelete?: OnActionType;
    onUpdate?: OnActionType;
    eager?: boolean;
    nullable?: boolean;
    cascade?: CascadeType;
    inverseSide?: string | ((obj: Any) => Any);
} & CommonPropertyOptions;

export type ModelOptions<T, R> = {
    name: string;
    properties?: Record<KeyOf<T>, PropertyOptions>;
    relations?: Record<KeyOf<R>, RelationOptions>;
    uniques?: Keys<T | R>;
    indexes?: Keys<T | R>;
    operations?: Record<string, boolean>;
    events?: Record<string, (value: T) => Partial<T>>;
};

import type { Cls } from "./common.js";
import type { Icon } from "./icon.js";
import type { InputType } from "./input-type.js";
import type { NumberFormat } from "./number-format.js";
import type { StringFormat } from "./string-format.js";

export type PropertyType = "string" | "number" | "boolean" | "integer" | "object" | "enum" | "array";

export type CommonPropertyOptions<PropertyName extends string> = {
    name?: PropertyName;
    label?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    description?: string;
    inputType?: InputType;
    icon?: Icon;
    hash?: boolean;
    encrypted?: boolean;
    unique?: boolean;
    notWithProperty?: PropertyName;
    dependsOnProperty?: PropertyName;
    readonly?: boolean;
};

export type StringPropertyOptions = {
    type: "string";
    minLength?: number;
    maxLength?: number;
    format?: StringFormat;
    isIn?: string[];
    isNotIn?: string[];
    pattern?: RegExp;
    contains?: string;
    notContains?: string;
    startsWith?: string;
    notStartsWith?: string;
    trim?: boolean;
    default?: string;
    example?: string;
    examples?: Record<string, string>;
};

export type CommonNumberPropertyOptions<PropertyName extends string> = {
    default?: number;
    example?: number;
    examples?: Record<string, number>;
    minimum?: number;
    maximum?: number;
    format?: NumberFormat;
    notMoreThanProperty?: PropertyName;
    notLessThanProperty?: PropertyName;
};

export type NumberPropertyOptions<PropertyName extends string> = {
    type: "number";
} & CommonNumberPropertyOptions<PropertyName>;

export type IntegerPropertyOptions<PropertyName extends string> = {
    type: "integer";
} & CommonNumberPropertyOptions<PropertyName>;

export type DatePropertyOptions = {
    type: "date";
    future?: boolean;
    past?: boolean;

    before?: Date;
    after?: Date;

    minYearsBefore?: number;
    maxYearsBefore?: number;

    minYearsAfter?: number;
    maxYearsAfter?: number;

    minDaysBefore?: number;
    maxDaysBefore?: number;

    minDaysAfter?: number;
    maxDaysAfter?: number;

    minMonthsBefore?: number;
    maxMonthsBefore?: number;

    minMonthsAfter?: number;
    maxMonthsAfter?: number;

    weekend?: boolean;
    weekday?: boolean;

    isCreatedAt?: boolean;
    isUpdatedAt?: boolean;
    isDeletedAt?: boolean;
};

export type BooleanPropertyOptions = {
    type: "boolean";
};

export type ObjectPropertyOptions = {
    type: "object";
    classType: Cls;
};

export type EnumPropertyOptions = {
    type: "enum";
    enum: object;
};

export type ArrayPropertyOptions<PropertyName extends string> = {
    type: "array";
    items: PropertyOptions<PropertyName>;
    maxArrayLength?: number;
    minArrayLength?: number;
};

export type PropertyOptions<PropertyName extends string = string> = CommonPropertyOptions<PropertyName> &
    (
        | StringPropertyOptions
        | NumberPropertyOptions<PropertyName>
        | IntegerPropertyOptions<PropertyName>
        | BooleanPropertyOptions
        | DatePropertyOptions
        | ObjectPropertyOptions
        | EnumPropertyOptions
        | ArrayPropertyOptions<PropertyName>
    );

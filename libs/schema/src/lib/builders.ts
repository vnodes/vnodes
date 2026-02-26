/** biome-ignore-all lint/suspicious/noExplicitAny: N/A */
/** biome-ignore-all lint/correctness/noConstructorReturn: N\A*/
/** biome-ignore-all lint/correctness/noUnusedVariables: N/A */
import type {
    ArrayPropertyOptions,
    BooleanPropertyOptions,
    DatePropertyOptions,
    EnumPropertyOptions,
    IntegerPropertyOptions,
    JsonPropertyOptions,
    NumberPropertyOptions,
    ObjectPropertyOptions,
    PropertyOptions,
    StringPropertyOptions,
} from './schema.js';

export type PropertyBooleanOptions =
    | 'readonly'
    | 'internal'
    | 'encrypt'
    | 'hash'
    | 'hidden'
    | 'isId'
    | 'required'
    | 'unique';

// Define the shape of the builder methods dynamically
type BuilderMethods<T, K extends keyof T = never> = {
    [P in keyof Omit<T, K>]-?: P extends PropertyBooleanOptions
        ? () => BuilderMethods<T, K | P> & { build(): T }
        : (value: Exclude<T[P], undefined>) => BuilderMethods<T, K | P> & { build(): T };
};

export class PropertyBuilder<T extends PropertyOptions, K extends keyof T = never> {
    protected options: Partial<T> = {};

    constructor(existingOptions: Partial<T> = {}) {
        this.options = existingOptions;

        return new Proxy(this, {
            get(target, prop) {
                if (prop === 'build') return () => target.options;
                if (prop in target) return (target as any)[prop];

                return (value: any) => {
                    return new PropertyBuilder<T, any>({
                        ...target.options,
                        [prop]: value === undefined ? true : value,
                    });
                };
            },
        }) as any;
    }

    // This method is only for the base class to provide the final result
    public build(): T {
        return this.options as T;
    }
}

export const str = () =>
    new PropertyBuilder<StringPropertyOptions>({
        type: 'string',
    }) as unknown as BuilderMethods<StringPropertyOptions>;

export const num = () =>
    new PropertyBuilder<NumberPropertyOptions>({
        type: 'number',
    }) as unknown as BuilderMethods<NumberPropertyOptions>;

export const int = () =>
    new PropertyBuilder<IntegerPropertyOptions>({
        type: 'integer',
    }) as unknown as BuilderMethods<IntegerPropertyOptions>;

export const bool = () =>
    new PropertyBuilder<BooleanPropertyOptions>({
        type: 'boolean',
    }) as unknown as BuilderMethods<BooleanPropertyOptions>;

export const json = () =>
    new PropertyBuilder<JsonPropertyOptions>({
        type: 'json',
    }) as unknown as BuilderMethods<JsonPropertyOptions>;

export const array = () =>
    new PropertyBuilder<ArrayPropertyOptions>({
        type: 'array',
    }) as unknown as BuilderMethods<ArrayPropertyOptions>;

export const enums = () =>
    new PropertyBuilder<EnumPropertyOptions>({
        type: 'enum',
    }) as unknown as BuilderMethods<EnumPropertyOptions>;

export const date = () =>
    new PropertyBuilder<DatePropertyOptions>({
        type: 'date',
    }) as unknown as BuilderMethods<DatePropertyOptions>;

export const obj = () =>
    new PropertyBuilder<ObjectPropertyOptions>({
        type: 'object',
    }) as unknown as BuilderMethods<ObjectPropertyOptions>;

export const prop = {
    int,
    num,
    str,
    bool,
    json,
    array,
    enums,
    obj,
} as const;

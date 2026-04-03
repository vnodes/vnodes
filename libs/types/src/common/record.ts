export type TypedRecord<T, V> = Record<keyof T, V>;
export type StringRecord<T> = TypedRecord<T, string>;
export type NumberRecord<T> = TypedRecord<T, number>;
export type BooleanRecord<T> = TypedRecord<T, boolean>;

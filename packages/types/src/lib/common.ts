export type KeyOf<T> = keyof T;

/**
 * Array<KeyOf<T>>
 */
export type Keys<T> = Array<KeyOf<T>>;

/**
 * Defined or undefined: `T | undefined`
 */
export type Some<T> = T | undefined;

/**
 * Defined or null:  `T | null;`
 */
export type Nullable<T> = T | null;

/**
 * Defined, undefined, or null: `T | undefined | null;`
 */
export type Optional<T> = T | undefined | null;

export type Obj = object;

export type CustomRecord<T extends Obj, V> = Record<KeyOf<T>, V>;

export type StringRecord<T extends Obj> = CustomRecord<T, string>;

export type NumberRecord<T extends Obj> = CustomRecord<T, number>;

export type BooleanRecord<T extends Obj> = CustomRecord<T, boolean>;

export type Any = any;

export type AnyFunction = (...args: Any[]) => Any;

/**
 * Any value
 */

// biome-ignore lint/suspicious/noExplicitAny: Global any
export type Any = any;

/**
 * Undefined value
 */
export type Some<T> = T | undefined;

/**
 * Nullable value
 */
export type Nullable<T> = T | null;

/**
 * Nullable or undefined value
 */
export type Optional<T> = T | undefined | null;

/**
 * Class type
 */
export type Cls<T = Any> = { new (...args: Any[]): T };

export type KeyOf<T> = keyof T;

export type Keys<T> = KeyOf<T>[];

export type Value<T, K extends keyof T> = T[K];

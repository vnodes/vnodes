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

export type Cls<T = Any> = { new (...args: Any[]): T };

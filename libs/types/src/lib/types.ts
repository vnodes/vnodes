/**
 * Any value
 */

// biome-ignore lint/suspicious/noExplicitAny: Global any
export type Any<T> = any | T;

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

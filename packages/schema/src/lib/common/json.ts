/**
 * Represents any valid JSON primitive value.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * Represents a valid JSON array.
 */
export type JsonArray = JsonValue[];

/**
 * Represents a valid JSON object.
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * The core recursive type representing any valid JSON structure.
 * This perfectly models what can be stored inside a Postgres `jsonb` column.
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

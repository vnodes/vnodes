/**
 * Primitive JSON types
 */
export type JSONSchema7Type = string | number | boolean | null | JSONSchema7Object | JSONSchema7Array;

export interface JSONSchema7Object {
    [key: string]: JSONSchema7Type;
}

export interface JSONSchema7Array extends Array<JSONSchema7Type> {}

/**
 * JSON Schema Draft 7 Specification
 */
export interface JSONSchema7 {
    $id?: string;
    $schema?: string;
    $ref?: string;
    $comment?: string;

    /**
     * Core Metadata
     */
    title?: string;
    description?: string;
    default?: JSONSchema7Type;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: JSONSchema7Type[];

    /**
     * Validation Keywords
     */
    type?: string | string[];
    enum?: JSONSchema7Type[];
    const?: JSONSchema7Type;

    /** Numbers */
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    /** Strings */
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: string;

    /** Arrays */
    items?: JSONSchema7Definition | JSONSchema7Definition[];
    additionalItems?: JSONSchema7Definition;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: JSONSchema7Definition;

    /** Objects */
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: { [key: string]: JSONSchema7Definition };
    patternProperties?: { [key: string]: JSONSchema7Definition };
    additionalProperties?: JSONSchema7Definition;
    dependencies?: { [key: string]: JSONSchema7Definition | string[] };
    propertyNames?: JSONSchema7Definition;

    /**
     * Combinators
     */
    allOf?: JSONSchema7Definition[];
    anyOf?: JSONSchema7Definition[];
    oneOf?: JSONSchema7Definition[];
    not?: JSONSchema7Definition;

    /**
     * Conditionals
     */
    if?: JSONSchema7Definition;
    then?: JSONSchema7Definition;
    else?: JSONSchema7Definition;

    /**
     * Subschemas
     */
    definitions?: { [key: string]: JSONSchema7Definition };
}

/**
 * A definition can be a Schema object or a boolean (true/false)
 */
export type JSONSchema7Definition = JSONSchema7 | boolean;

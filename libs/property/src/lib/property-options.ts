import type { ApiPropertyOptions } from "@nestjs/swagger";

/**
 * Common OpenAPI string formats supported by most Swagger UI
 * and code generation tools.
 */
export type PropertyFormat =
    | "password"
    | "date" // full-date (RFC3339)
    | "date-time" // date-time (RFC3339)
    | "password" // hint for UI masking
    | "byte" // base64 encoded characters
    | "binary" // binary data (files)
    | "email" // internet email address
    | "uuid" // universal unique identifier
    | "uri" // uniform resource identifier
    | "ipv4" // IP v4 address
    | "ipv6" // IP v6 address
    | "hostname" // internet host name
    | "int32" // signed 32-bit integer
    | "int64" // signed 64-bit integer
    | "float" // 32-bit float
    | "double" // 64-bit float
    | (string & {}); // Allows any string while keeping autocomplete

export type PropertyNativeType = "String" | "Number" | "Date" | "Array" | "Boolean";

export type PropertyOptions = ApiPropertyOptions & {
    exclude?: boolean;
    trim?: string;
};

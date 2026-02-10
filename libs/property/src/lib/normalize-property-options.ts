import type { PropertyOptions } from "./property-options.js";

export function normalizePropertyOptions(options: PropertyOptions): PropertyOptions {
    return { ...options, required: options.required === true } as PropertyOptions;
}

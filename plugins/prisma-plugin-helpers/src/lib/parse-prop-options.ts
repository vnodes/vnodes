import { type PropOptions, propOptionKeys } from '@vnodes/prop';
import type { StringRecord } from '@vnodes/types';

export type ParsedPropOptions = Partial<StringRecord<PropOptions>>;

export function parsePropOptions(options: Record<string, string>): ParsedPropOptions {
    const result = {} as ParsedPropOptions;

    for (const key of propOptionKeys) {
        const value = options[key];
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}

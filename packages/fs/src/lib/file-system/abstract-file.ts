/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: Abstract class */
import type { ScopedResolver } from '../path/scope.js';

export class AbstractFile<T> {
    constructor(
        private readonly filepath: string,
        private readonly scopedResolver?: ScopedResolver,
    ) {}

    protected resolve() {
        return this.scopedResolver?.(this.filepath) ?? this.filepath;
    }

    async read(): Promise<T> {
        throw new Error('Not implemented');
    }

    async write(content: T) {
        throw new Error('Not implemented');
    }
    async update(updateFn: (value: T) => T) {
        throw new Error('Not implemented');
    }
}

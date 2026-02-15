import { normalize, resolve } from 'node:path';
import { FileOutOfScopeError } from '@vnodes/errors';

export function createSafeResolver(basePath: string) {
    basePath = normalize(basePath);
    return function safeResolve(...paths: string[]): string {
        const resolvedPath = resolve(basePath, ...paths);

        if (resolvedPath.startsWith(basePath)) {
            return resolvedPath;
        }
        throw new FileOutOfScopeError('Resolved path is outside of the base path', { path: resolvedPath });
    };
}

import { resolve } from 'node:path';

/**
 * Create a safe scopeed resolver
 *
 * @param rootPath
 * @returns
 */
export function createSafeResolver(rootPath: string) {
    rootPath = resolve(rootPath);
    return function safeResolve(...paths: string[]): string {
        const resolvedPath = resolve(rootPath, ...paths);

        if (resolvedPath.startsWith(rootPath)) {
            return resolvedPath;
        }
        throw new Error(`The path, ${resolvedPath} is out of the defined scope , ${rootPath}`);
    };
}

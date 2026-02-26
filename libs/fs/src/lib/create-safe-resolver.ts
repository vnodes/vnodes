import { normalize, resolve } from 'node:path';

export function createSafeResolver(basePath: string) {
    basePath = normalize(basePath);
    return function safeResolve(...paths: string[]): string {
        const resolvedPath = resolve(basePath, ...paths);

        if (resolvedPath.startsWith(basePath)) {
            return resolvedPath;
        }
        throw new Error(`The path, ${resolvedPath} is out of the defined scope , ${basePath}`);
    };
}

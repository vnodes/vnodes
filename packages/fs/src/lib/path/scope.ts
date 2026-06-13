import { resolve as nodeResolve } from 'node:path';

export type ScopedResolver = (...segments: string[]) => string;

/**
 * Create a scoped resolver that resolves path segments and compre the absolute result with the {@link scopedPath}.
 * If absolute result not under the {@link scopedPath}, then it throws {@link AccessDeniedError}
 *
 * @param scopedPath scoped path.
 * @returns -- {@link ScopedResolver}
 */
export function scope(scopedPath: string): ScopedResolver {
    const absoluteRoot = nodeResolve(scopedPath);

    return (...segments: string[]) => {
        const absolutePath = nodeResolve(...segments);

        if (absolutePath.startsWith(absoluteRoot)) {
            return absolutePath;
        }
        throw new Error(`Access denied to the path, ${absolutePath}`);
    };
}

/**
 * Create a resolver function that resolves the segments following the defined scoped path
 *
 * @param scopedPath scoped path
 * @returns -- {@link ScopedResolver}
 */
export function relativeScope(scopedPath: string) {
    const rootPath = nodeResolve(scopedPath);
    const resolve = scope(scopedPath);
    return (...segments: string[]) => resolve(rootPath, ...segments);
}

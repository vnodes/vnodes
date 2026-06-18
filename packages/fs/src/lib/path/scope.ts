import { resolve as nodeResolve, relative, sep } from 'node:path';

/**
 * Create a scoped resolver that resolves path segments and compre the absolute result with the {@link scopedPath}.
 * If absolute result not under the {@link scopedPath}, then it throws {@link AccessDeniedError}
 *
 * @param scopedPath scoped path.
 * @returns -- {@link ScopedResolver}
 */
export function scope(scopedPath: string): typeof nodeResolve {
  const absoluteRoot = nodeResolve(scopedPath);

  return (...segments: string[]) => {
    const absolutePath = nodeResolve(absoluteRoot, ...segments);

    // Determine the relative path from the root to the target
    const relativePath = relative(absoluteRoot, absolutePath);

    // Security Check: If it starts with '..' or moves up the tree, block it.
    const isUnderRoot = relativePath === '' || (!relativePath.startsWith('..') && !relativePath.startsWith(sep));

    if (isUnderRoot) {
      return absolutePath;
    }

    throw new Error(`Access denied: Path ${absolutePath} escapes the scoped directory ${absoluteRoot}`);
  };
}

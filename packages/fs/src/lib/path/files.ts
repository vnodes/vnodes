import { opendir, readdir } from 'node:fs/promises';
import { join, normalize } from 'node:path';

/**
 * List all file paths under the {@link rootPath}.
 * @param rootPath
 * @returns
 */
export async function files(rootPath: string): Promise<string[]> {
  const preResult = await readdir(rootPath, { recursive: true, withFileTypes: true });
  return preResult.filter((e) => e.isFile()).map((e) => normalize(join(e.parentPath, e.name)));
}

/**
 * High-performance, streaming directory traversal using Async Generators.
 * Memory footprint stays near zero regardless of whether there are 10 or 1,000,000 files.
 * @param rootPath The directory to traverse
 */
export async function* filesGenerator(rootPath: string): AsyncGenerator<string> {
  let dir;
  try {
    // opendir streams directory entries instead of loading them all at once
    dir = await opendir(rootPath);
  } catch (err) {
    // Handle or ignore permission errors/missing folders
    return;
  }

  for await (const entry of dir) {
    const fullPath = join(rootPath, entry.name);

    if (entry.isDirectory()) {
      // Recursively yield files from subdirectories without deep stacking arrays
      yield* filesGenerator(fullPath);
    } else if (entry.isFile()) {
      // Immediately stream the file path out to the consumer
      yield fullPath;
    }
  }
}

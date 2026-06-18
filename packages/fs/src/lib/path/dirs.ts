import { opendir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * List all directories/files path under the {@link rootPath}.
 * @param rootPath
 * @returns
 */
export async function dirs(rootPath: string) {
  return await readdir(rootPath, { recursive: true, withFileTypes: true });
}

/**
 * High-performance, streaming directory traversal using Async Generators.
 * Memory footprint stays near zero regardless of whether there are 10 or 1,000,000 files.
 * * @param rootPath The directory to traverse
 */
export async function* dirsGenerator(rootPath: string): AsyncGenerator<string> {
  let dir;
  try {
    // opendir streams directory entries instead of loading them all at once
    dir = await opendir(rootPath);
  } catch (err) {
    // Handle or ignore permission errors/missing folders
    return;
  }

  try {
    for await (const entry of dir) {
      const fullPath = join(rootPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively yield files from subdirectories without deep stacking arrays
        yield* dirsGenerator(fullPath);
      } else if (entry.isFile()) {
        // Immediately stream the file path out to the consumer
        yield fullPath;
      }
    }
  } finally {
    // Explicitly close the directory handle
    await dir.close();
  }
}

import { readdir } from 'node:fs/promises';
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

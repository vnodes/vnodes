import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { cwd } from 'node:process';

export type DirsOptions = {
  recursive?: boolean;
};

export type Dir = {
  relativePath: string;
  absolutePath: string;
  fileName: string;
  isFile: boolean;
  isDirectory: boolean;
  children?: Dir[];
};

/**
 * List files/directories
 *
 * @param rootPath root directory path
 * @param options {@link DirsOptions}
 * @returns dirs {@link Dir[]}
 */
export async function dirs(rootPath: string, options?: DirsOptions): Promise<Dir[]> {
  const foundPaths = await readdir(rootPath, { encoding: 'utf8' });

  const result: Dir[] = [];

  for (const fileName of foundPaths) {
    const absolutePath = resolve(join(rootPath, fileName));
    const relativePath = absolutePath.replace(`${cwd()}/`, './');
    const __stat = await stat(absolutePath);
    const isDirectory = __stat.isDirectory();
    const isFile = __stat.isFile();

    const newDir: Dir = {
      fileName,
      relativePath,
      absolutePath,
      isDirectory,
      isFile,
    };

    if (isDirectory && options?.recursive === true) {
      const children = await dirs(absolutePath, options);

      if (children) {
        newDir.children = children;
      }
    }
    result.push(newDir);
  }

  return result;
}

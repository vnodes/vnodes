import { type Command } from 'commander';
import { readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

/**
 * Suffix file/files recursive (optional)
 *
 * ### Example
 * ````sh
 *  # Add .template suffix
 *  vnodes suffix --s .template -r
 *
 *  # Remove the .template suffix
 *  vnodes suffix --s .template -r -u
 * ````
 * @param command main command instance
 */
export function suffix(command: Command) {
  command
    .command('suffix')
    .option('-u, --undo', 'Remove the suffix from file names')
    .option('-r, --recursive', 'Apply suffix to all files under sub directories')
    .option('-p, --parallel <>', 'How many concurrent operations', '4')
    .requiredOption('-s, --suffix <string>', 'Suffix to append to the file names')
    .action(async ({ suffix, parallel, recursive, undo }) => {
      const PARALLEL = Number(parallel) || 4;
      const foundDirs = await readdir(cwd(), {
        recursive: !!recursive,
        withFileTypes: true,
      });

      const absolutePaths = foundDirs
        .filter((e) => e.isFile())
        .map((e) => join(e.parentPath, e.name));

      const newFilepath = (filePath: string) => {
        return undo ? filePath.slice(0, -suffix.length) : `${filePath}${suffix}`;
      };

      const asyncOperations = absolutePaths.map(
        (filePath) => () => rename(filePath, newFilepath(filePath)),
      );

      await parallel(asyncOperations, PARALLEL);
    });
}

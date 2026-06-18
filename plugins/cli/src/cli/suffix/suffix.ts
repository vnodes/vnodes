import { Command } from 'commander';
import { readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

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
    .requiredOption('-s, --suffix <string>', 'Suffix to append to the file names')
    .action(async ({ suffix, recursive, undo }) => {
      const absolutePaths = readdirSync('', {
        recursive: !!recursive,
        withFileTypes: true,
      })
        .filter((e) => e.isFile())
        .map((e) => join('./', e.parentPath, e.name));

      const createNewFilepath = (filePath: string) => {
        return undo ? filePath.replace(new RegExp(`${suffix}$`), '') : `${filePath}${suffix}`;
      };

      for (const filePath of absolutePaths) {
        renameSync(filePath, createNewFilepath(filePath));
      }
    });
}

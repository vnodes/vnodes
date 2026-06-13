import { Command } from 'commander';
import { readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Suffix file/files recursive
 *
 * ### Example
 * ````sh
 *  vnodes suffix --username YourName
 * ````
 * @param command main command instance
 */
export function suffix(command: Command) {
  command
    .command('suffix')
    .option('-u, --undo', 'Would you like to undo the suffix?')
    .option('-r, --recursive', 'Would you like to do recursively?')
    .requiredOption(
      '-s, --suffix <string>',
      'What suffix would you like to add?',
    )
    .action(async ({ suffix, recursive, undo }) => {
      const filePaths = readdirSync('./', {
        recursive: !!recursive,
        withFileTypes: true,
      })
        .filter((e) => e.isFile())
        .map((e) => join('./', e.parentPath, e.name));

      const createNewFilepath = (filePath: string) => {
        return undo
          ? filePath.replace(new RegExp(`${suffix}$`), '')
          : `${filePath}${suffix}`;
      };

      for (const filePath of filePaths) {
        renameSync(filePath, createNewFilepath(filePath));
      }
    });
}

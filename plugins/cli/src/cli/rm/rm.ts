import { Command } from 'commander';
import { rmSync } from 'node:fs';
import { scope } from '@vnodes/fs';
import { cwd } from 'node:process';
/**
 * Remove files/directories
 *
 * ### Example
 * ````sh
 *  vnodes rm --path some/path/to/delete
 * ````
 * @param command main command instance
 */
export function rm(command: Command) {
  command
    .command('rm')
    .description('Remove all directories/files under the given path.')
    .requiredOption('-p, --path <string>', 'Path to delete')
    .action(({ path }) => {
      const resolve = scope(cwd());
      rmSync(resolve(path), { recursive: true, force: true });
    });
}

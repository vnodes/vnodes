import { Command } from 'commander';
import { rm as nodeRm } from 'node:fs/promises';
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
    .action(async ({ path }) => {
      const resolve = scope(cwd());
      await nodeRm(resolve(path), { recursive: true, force: true, maxRetries: 3, retryDelay: 400 });
    });
}

import { Command } from 'commander';
import { rmSync } from 'node:fs';
import { scope } from '@vnodes/fs';
import { cwd } from 'node:process';
/**
 * Remove files/directories
 *
 * ### Example
 * ````sh
 *  vnodes rm --username YourName
 * ````
 * @param command main command instance
 */
export function rm(command: Command) {
  command
    .command('rm')
    .requiredOption('-p, --path <string>', 'What is your name')
    .action(({ path }) => {
      const resolve = scope(cwd());
      rmSync(resolve(path), { recursive: true, force: true });
    });
}

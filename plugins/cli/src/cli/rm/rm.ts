import { Command } from 'commander';
import { rmSync } from 'node:fs';

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
      rmSync(path, { recursive: true });
    });
}

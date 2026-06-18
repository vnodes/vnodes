import { type Command } from 'commander';
import { cwd } from 'node:process';

/**
 * Print the current working directory
 *
 * ### Example
 * ````sh
 *  vnodes hello --username YourName
 * ````
 * @param command main command instance
 */
export function wd(command: Command) {
  command.command('wd').action(() => {
    console.log(cwd());
  });
}

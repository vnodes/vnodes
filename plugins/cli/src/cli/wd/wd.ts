import { Command } from 'commander';
import { cwd } from 'process';
/**
 * Show working directory
 * @param command
 */
export function wd(command: Command) {
  command.command('wd').action(() => {
    console.log(cwd());
  });
}

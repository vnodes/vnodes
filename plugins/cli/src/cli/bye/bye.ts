import { type Command } from 'commander';

/**
 * Say bye
 *
 * ### Example
 * ````sh
 *  vnodes bye --username YourName
 * ````
 * @param command main command instance
 */
export function bye(command: Command) {
  command
    .command('bye')
    .requiredOption('-u, --username <string>', 'What is your name')
    .action(({ username }) => console.log(`Hello, ${username}`));
}

import { Command } from 'commander';

/**
 * Say hello to the user
 *
 * ### Example
 * ````sh
 *  vnodes hello --username YourName
 * ````
 * @param command main command instance
 */
export function hello(command: Command) {
  command
    .command('hello')
    .requiredOption('-u, --username <string>', 'What is your name')
    .action(({ username }) => console.log(`Hello, ${username}`));
}

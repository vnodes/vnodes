import { Command } from 'commander';

export function hello(command: Command) {
  command
    .command('hello')
    .requiredOption('-u, --username <string>', 'What is your name')
    .action(({ username }) => console.log(`Hello, ${username}`));
}

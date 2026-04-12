import type { Command } from 'commander';

export function helloCommand(program: Command) {
    program
        .command('hello')
        .requiredOption('--username,-u <string>', 'Username')
        .action(({ username }) => {
            console.log('Hello %s', username);
        });
}

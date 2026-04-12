import type { Command } from 'commander';

export function byeCommand(program: Command) {
    program

        .command('bye')
        .description('Say bye')
        .version('0.0.1')
        .requiredOption('-u, --username <string>', 'Username')
        .action(({ username }) => {
            console.log('Bye %s', username);
        });
}

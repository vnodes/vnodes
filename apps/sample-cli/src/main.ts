import { Command } from 'commander';
import { byeCommand, helloCommand } from './commands/index.js';

export function main() {
    const program = new Command();
    program
        //
        .name('sample-cli')
        .description('sample-cli')
        .version('0.0.1');

    byeCommand(program);
    helloCommand(program);

    program.parse();
}

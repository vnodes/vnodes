import { program } from 'commander';
import { hello } from './hello/hello.js';
import { wd } from './wd/wd.js';

program
  .name('Vnodes cli')
  .description('Tools and generators')
  .version('0.1.0')
  .showHelpAfterError(true);

[hello, wd].map((c) => c(program));

program.parse();

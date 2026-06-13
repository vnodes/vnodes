import { program } from 'commander';
import { hello } from './hello/hello.js';
import { wd } from './wd/wd.js';
import { suffix } from './suffix/suffix.js';

program
  .name('Vnodes cli')
  .description('Tools and generators')
  .version('0.1.0')
  .showHelpAfterError(true);

[hello, wd, suffix].map((c) => c(program));

program.parse();

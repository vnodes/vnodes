import { program } from 'commander';
import { hello } from './hello/hello.js';
import { wd } from './wd/wd.js';
import { suffix } from './suffix/suffix.js';
import { rm } from './rm/rm.js';
import { bye } from './bye/bye.js';
import { workspace } from './workspace/workspace.js';

program.name('Vnodes cli').description('Tools and generators').version('0.1.0').showHelpAfterError(true);

[hello, bye, wd, suffix, rm, workspace].map((c) => c(program));

program.parse();

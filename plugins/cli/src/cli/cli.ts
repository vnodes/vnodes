import { program } from 'commander';
import { bye } from './bye/bye.js';
import { hello } from './hello/hello.js';
import { rm } from './rm/rm.js';
import { suffix } from './suffix/suffix.js';
import { wd } from './wd/wd.js';
import { workspaceVersion } from './workspace-version/workspace-version.js';
import { workspace } from './workspace/workspace.js';

program
  .name('Vnodes cli')
  .description('Tools and generators')
  .version('0.1.0')
  .showHelpAfterError(true);

[workspaceVersion, hello, bye, wd, suffix, rm, workspace].map((c) => c(program));

program.parse();

import { type Command } from 'commander';
import { WORKSPACE_VERSION } from '../../common/constants.js';

/**
 * Say workspace-version
 *
 * ### Example
 * ````sh
 *  vnodes workspace-version --username YourName
 * ````
 * @param command main command instance
 */
export function workspaceVersion(command: Command) {
  command.command('workspace-version').action(async () => {
    console.log(WORKSPACE_VERSION);
  });
}

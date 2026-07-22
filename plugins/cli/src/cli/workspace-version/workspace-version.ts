import { type Command } from 'commander';
import { getWorkspaceVersion } from '../../utils/get-workspace-version.js';

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
  command
    .command('workspace-version')

    .action(async () => {
      const version = await getWorkspaceVersion();
      console.log(version);
    });
}

import * as path from 'node:path';
import { formatFiles, generateFiles, Tree, updateJson, workspaceRoot } from '@nx/devkit';

/**
 * Some text goes here
 *
 * @param tree
 *
 */
export async function initGenerator(tree: Tree) {
    generateFiles(tree, path.join(__dirname, 'files'), workspaceRoot, {});

    await updateJson(tree, 'nx.json', (value) => {
        if (!value.generators) {
            value.generators = {};
        }

        if (!value.generators['@vnodes/cli:project'])
            value.generators['@vnodes/cli:project'] = {
                org: 'vnodes',
                email: 'robert.brightline@gmail.com',
                homepage: 'https://vnodes.github.io/vnodes',
                funding: 'https://cash.app/$puqlib',
            };
        return value;
    });
    await formatFiles(tree);
}

export default initGenerator;

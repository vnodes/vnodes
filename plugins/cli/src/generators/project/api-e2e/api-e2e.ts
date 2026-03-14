import * as path from 'node:path';
import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { ApiE2eGeneratorSchema } from './schema';

export async function apiE2eGenerator(tree: Tree, options: ApiE2eGeneratorSchema) {
    const projectRoot = `libs/${options.name}`;
    addProjectConfiguration(tree, options.name, {
        root: projectRoot,
        projectType: 'library',
        sourceRoot: `${projectRoot}/src`,
        targets: {},
    });
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
    await formatFiles(tree);
}

export default apiE2eGenerator;

import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  type Tree,
} from '@nx/devkit';
import { join } from 'node:path';
import { type ProjectGeneratorSchema } from './schema.d.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default projectGenerator;

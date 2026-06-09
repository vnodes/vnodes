import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';
import { join } from 'node:path';
import { type ProjectGeneratorSchema } from './schema.d.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const projectRoot = `libs/${options.name}`;
  generateFiles(tree, join(__dirname, 'lib'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default projectGenerator;

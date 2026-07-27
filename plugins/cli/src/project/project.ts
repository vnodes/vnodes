import { formatFiles, generateFiles, type Tree } from '@nx/devkit';
import * as path from 'node:path';
import type { ProjectGeneratorSchema } from './schema';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const projectRoot = `libs/${options.name}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default projectGenerator;

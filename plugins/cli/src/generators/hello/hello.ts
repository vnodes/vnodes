import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import type { HelloGeneratorSchema } from './schema.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function helloGenerator(tree: Tree, options: HelloGeneratorSchema) {
  const sourceRoot = join(__dirname, 'files');

  const name = options.directory.split('/').pop();

  if (!name) throw new Error(`Could not extract the name from directory ${options.directory}`);
  const targetRoot = options.directory;
  generateFiles(tree, sourceRoot, targetRoot, { ...names(name) });
  await formatFiles(tree);
}

export default helloGenerator;

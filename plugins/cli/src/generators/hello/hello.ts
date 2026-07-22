import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import type { HelloGeneratorSchema } from './schema.js';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function helloGenerator(tree: Tree, options: HelloGeneratorSchema) {
  const sourceRoot = join(__dirname, 'files');

  const name = basename(options.directory);

  const targetRoot = options.directory;

  generateFiles(tree, sourceRoot, targetRoot, { ...names(name) });
  await formatFiles(tree);
}

export default helloGenerator;

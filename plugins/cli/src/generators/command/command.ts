import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import type { CommandGeneratorSchema } from './schema.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function commandGenerator(tree: Tree, options: CommandGeneratorSchema) {
  const sourceRoot = join(__dirname, 'files');
  const targetRoot = `${options.name}`;
  generateFiles(tree, sourceRoot, targetRoot, { ...names(options.name) });
  await formatFiles(tree);
}

export default commandGenerator;

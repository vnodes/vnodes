import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import type { CommandGeneratorSchema } from './schema.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { inferProjectConfiguration } from '../../utils/infer-project-configuration.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function commandGenerator(tree: Tree, options: CommandGeneratorSchema) {
  const sourceRoot = join(__dirname, 'files');
  const projectConfig = inferProjectConfiguration(tree);
  const projectRoot = projectConfig.root;
  const targetRoot = `${projectRoot}/src/cli/${options.name}`;

  generateFiles(tree, sourceRoot, targetRoot, { ...names(options.name) });
  await formatFiles(tree);
}

export default commandGenerator;

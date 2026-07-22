import { formatFiles, generateFiles, names, updateJson, type Tree } from '@nx/devkit';

import { type GeneratorGeneratorSchema } from './schema.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inferProjectConfiguration } from '../../utils/infer-project-configuration.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function generatorGenerator(tree: Tree, options: GeneratorGeneratorSchema) {
  const sourceRoot = join(__dirname, 'files');

  const projectConfig = inferProjectConfiguration(tree);

  const generatorRoot = join(projectConfig.root, 'src', 'generators', options.name);

  generateFiles(tree, sourceRoot, generatorRoot, { ...names(options.name) });

  updateJson(tree, join(projectConfig.root, 'generators.json'), (value) => {
    value.generators[options.name] = {
      factory: `./dist/generators/${options.name}/${options.name}.js`,
      schema: `./dist/generators/${options.name}/schema.json`,
      description: `${options.name} generator`,
    };
    return value;
  });
  await formatFiles(tree);
}

export default generatorGenerator;

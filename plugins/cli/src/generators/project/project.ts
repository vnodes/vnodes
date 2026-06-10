import { formatFiles, generateFiles, updateJson, type Tree } from '@nx/devkit';
import { join } from 'node:path';
import { type ProjectGeneratorSchema } from './schema.d.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const name = options.directory.split(/\//).pop();
  if (!name) throw new Error(`Cannot extract name from ${options.directory}`);
  const projectName = `@${options.orgName}/${name}`;
  const sourceRoot = join(__dirname, options.projectType);
  const targetRoot = join(options.directory);

  options.email = options.email.split('@').join(`+${name}@`);

  generateFiles(tree, sourceRoot, targetRoot, {
    ...options,
    projectName,
  });

  updateJson(tree, 'tsconfig.json', (value) => {
    if (!value.references) {
      value.references = [];
    }

    value.references.push({
      path: `./${options.directory}`,
    });

    return value;
  });
  await formatFiles(tree);
}

export default projectGenerator;

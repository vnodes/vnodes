import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  type Tree,
} from '@nx/devkit';
import { join } from 'node:path';
import { type ProjectGeneratorSchema } from './schema.d.js';

export type NormalizedProjectGeneratorOptions = ProjectGeneratorSchema & {
  shortName: string;
  sourceRoot: string;
  targetRoot: string;
};
export function normalizeProjectSchema(
  options: ProjectGeneratorSchema,
): NormalizedProjectGeneratorOptions {
  const shortName = options.directory.split('/').pop();

  if (typeof shortName !== 'string') {
    throw new Error(
      `Could not resolve the short name of the project form ${options.directory}`,
    );
  }

  const sourceRoot = join(__dirname, options.projectType);
  const targetRoot = join(options.directory);

  if (!options.projectName) {
    options.projectName = `@${options.orgName}/${shortName}`;
  }

  options.email = options.email
    .split('@')
    .join(`-${options.orgName}-${shortName}@`);

  return { ...options, shortName, sourceRoot, targetRoot };
}
export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const { shortName, sourceRoot, targetRoot } = normalizeProjectSchema(options);

  generateFiles(tree, sourceRoot, targetRoot, {
    ...options,
    ...names(shortName),
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

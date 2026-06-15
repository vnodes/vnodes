import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  type Tree,
} from '@nx/devkit';
import { dirname, join } from 'node:path';
import { type ProjectGeneratorSchema, type ProjectType } from './schema.d.js';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function autoTag(projectType: ProjectType): string {
  switch (projectType) {
    case 'lib': {
      return 'lib:shared';
    }
    case 'cli':
    case 'api': {
      return `app:${projectType}`;
    }
    case 'prisma': {
      return `lib:core`;
    }
  }
}

export type NormalizedProjectGeneratorOptions = ProjectGeneratorSchema & {
  projectName: string;
  shortName: string;
  sourceRoot: string;
  targetRoot: string;
  tag: string;
  workspaceVersion: string;
} & ReturnType<typeof names>;

export function normalizeProjectSchema(
  options: ProjectGeneratorSchema,
): NormalizedProjectGeneratorOptions {
  const normalizedOptions = { ...options } as NormalizedProjectGeneratorOptions;

  const shortName = options.directory.split('/').pop();

  if (typeof shortName !== 'string') {
    throw new Error(
      `Could not resolve the short name of the project form ${options.directory}`,
    );
  }
  normalizedOptions.shortName = shortName;
  normalizedOptions.sourceRoot = join(__dirname, options.projectType);
  normalizedOptions.targetRoot = join(options.directory);
  normalizedOptions.projectName = `@${options.orgName}/${shortName}`;
  normalizedOptions.tag = autoTag(normalizedOptions.projectType);
  normalizedOptions.email = options.email
    .split('@')
    .join(`+${options.orgName}-${shortName}@`);

  return { ...normalizedOptions, ...names(shortName) };
}

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const normalizedOptions = normalizeProjectSchema(options);

  generateFiles(
    tree,
    normalizedOptions.sourceRoot,
    normalizedOptions.targetRoot,
    { ...normalizedOptions },
  );

  generateFiles(tree, join(__dirname, 'common'), normalizedOptions.targetRoot, {
    ...normalizedOptions,
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

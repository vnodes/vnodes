import { formatFiles, generateFiles, names, updateJson, type Tree } from '@nx/devkit';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type ProjectGeneratorSchema, type ProjectType } from './schema.d.js';

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
      return `app:db`;
    }
  }
}

export function brandEmail(orgName: string, shortName: string, email: string) {
  return email.split('@').join(`+${orgName}-${shortName}@`);
}

export type NormalizedProjectGeneratorOptions = ProjectGeneratorSchema & {
  projectName: string;
  shortName: string;
  sourceRoot: string;
  targetRoot: string;
  tag: string;
  workspaceVersion: string;
  databaseProjectName: string;
  commonShortName: string;
} & ReturnType<typeof names>;

export function normalizeProjectSchema(
  options: ProjectGeneratorSchema,
): NormalizedProjectGeneratorOptions {
  const n = { ...options } as NormalizedProjectGeneratorOptions;

  const shortName = basename(options.directory);

  n.shortName = shortName;

  n.sourceRoot = join(__dirname, options.projectType);
  n.targetRoot = join(options.directory);
  n.projectName = `@${options.orgName}/${shortName}`;
  n.tag = autoTag(n.projectType);
  n.email = brandEmail(options.orgName, shortName, options.email);

  if (n.projectName.match(/-api$/)) {
    n.databaseProjectName = n.projectName.replace(/-api$/, '-db');
  } else {
    n.databaseProjectName = n.projectName + '-db';
  }

  n.commonShortName = n.shortName.replace(/-api$/, '').replace(/-db$/, '');
  n.workspaceVersion ??= '0.1.11';

  return { ...n, ...names(shortName) };
}

export async function projectGenerator(tree: Tree, options: ProjectGeneratorSchema) {
  const normalizedOptions = normalizeProjectSchema(options);

  generateFiles(tree, normalizedOptions.sourceRoot, normalizedOptions.targetRoot, {
    ...normalizedOptions,
  });

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

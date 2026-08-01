import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  workspaceRoot,
  type Tree,
} from '@nx/devkit';

import { ProjectType, type ProjectGeneratorSchema } from './schema.js';

import {
  getGitAuthorName,
  getGitEmail,
  getGitHubPageUrl,
  getGitOriginName,
  getGitOriginUrl,
  getGitRepoName,
} from '@vnodes/utils/email';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function updateTsconfigReferences(tree: Tree, directory: string) {
  updateJson(tree, join(workspaceRoot, 'tsconfig.json'), (value) => {
    value.references ??= [];
    value.references.push({
      path: directory,
    });
    return value;
  });
}

export function normalizeTags(projectType: ProjectType, tags?: string): string {
  const normalTags: string[] = tags?.split(',') ?? [];

  switch (projectType) {
    case ProjectType.ANGULAR_LIB:
    case ProjectType.LIB:
    case ProjectType.SCHEMA: {
      normalTags.push('lib:shared');
      break;
    }
    case ProjectType.CLI: {
      normalTags.push('app:cli');
      break;
    }
    case ProjectType.NESTJS: {
      normalTags.push('app:api');
      break;
    }
    case ProjectType.ANGULAR: {
      normalTags.push('app:client');
      break;
    }

    case ProjectType.PRISMA: {
      normalTags.push('lib:data');
      break;
    }
  }

  const stringTags = normalTags.map((e) => `"${e}"`).join(',');

  return `[ ${stringTags} ]`;
}

export function normalizeProjectOptions(
  options: ProjectGeneratorSchema,
): Required<ProjectGeneratorSchema> {
  const originUrl = getGitOriginUrl(workspaceRoot);
  const projectType = options.type ?? ProjectType.LIB;

  const projectShortName =
    options.projectShortName ?? basename(options.directory);
  const projectName =
    options.projectName ?? `@${options.repoName}/${options.projectShortName}`;

  const normalOptions: Required<ProjectGeneratorSchema> = {
    directory: options.directory,
    originName: options.originName ?? getGitOriginName(originUrl),
    repoName: options.repoName ?? getGitRepoName(originUrl),
    projectShortName,
    projectName,
    email: options.email ?? getGitEmail(workspaceRoot),
    fundingUrl: options.fundingUrl ?? 'https://cash.app/$puqlib',
    type: projectType,
    authorName: options.authorName ?? getGitAuthorName(workspaceRoot),
    tags: normalizeTags(projectType, options.tags),
    names: names(projectShortName),
    homePageUrl: `${getGitHubPageUrl(originUrl)}/${options.directory}`,
    workspaceVersion: options.workspaceVersion ?? '0',
    dbProjectName: options.dbProjectName ?? `${projectName}-db`,
  };

  return normalOptions;
}

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const o = normalizeProjectOptions(options);

  const projectType = options.type ?? ProjectType.LIB;

  const COMMON_SOURCE_FILES = join(__dirname, 'common');
  const PROJECT_SOURCE_FILES = join(__dirname, projectType);

  switch (o.type) {
    case ProjectType.CLI:
    case ProjectType.NESTJS:
    case ProjectType.LIB:
    case ProjectType.SCHEMA:
    case ProjectType.PRISMA: {
      generateFiles(tree, COMMON_SOURCE_FILES, o.directory, options);
      generateFiles(tree, PROJECT_SOURCE_FILES, o.directory, options);

      break;
    }
    case ProjectType.ANGULAR:
    case ProjectType.ANGULAR_LIB: {
      throw new Error('Not implemented');
    }
  }

  updateTsconfigReferences(tree, options.directory);
  await formatFiles(tree);
}

export default projectGenerator;

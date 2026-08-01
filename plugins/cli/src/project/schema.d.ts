import { type names } from '@nx/devkit';

export enum ProjectType {
  CLI = 'cli',
  NESTJS = 'nestjs',
  ANGULAR = 'angular',
  ANGULAR_LIB = 'angular-lib',
  LIB = 'lib',
  SCHEMA = 'schema',
  PRISMA = 'prisma',
}

export interface ProjectGeneratorSchema {
  directory: string;
  projectName?: string;
  projectShortName?: string;
  email?: string;
  fundingUrl?: string;
  repoName?: string;
  originName?: string;
  type?: ProjectType;
  authorName?: string;
  tags?: string;
  names?: ReturnType<typeof names>;
  homePageUrl?: string;
  workspaceVersion?: string;
  dbProjectName?: string;
}

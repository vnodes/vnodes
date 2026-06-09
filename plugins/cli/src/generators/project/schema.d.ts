export type ProjectType = 'lib' | 'api';

export interface ProjectGeneratorSchema {
  directory: string;
  projectType: ProjectType;
  orgName: string;
  repoName: string;
  homePageUrl: string;
  email: string;
  funding: string;
  authorName: string;
}

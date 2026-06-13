export type ProjectType = 'lib' | 'api' | 'cli';

export interface ProjectGeneratorSchema {
  /**
   * Project directory ex. `libs/types`
   */
  directory: string;

  /**
   * Project type such as `lib`, `api`
   */
  projectType: ProjectType;

  /**
   * Orgnaization name such as `vnodes` will be used the create the `projectName` `(@vnodes/project-name)`
   */
  orgName: string;

  /**
   * Repository name will be used the create relative links/urls for documentation
   */
  repoName: string;

  /**
   * The homepage url that serve the documentation for the project
   */
  homePageUrl: string;

  /**
   * Author's email addresss
   */
  email: string;

  /**
   * Funding url
   */
  fundingUrl: string;

  /**
   * Author's full name
   */
  authorName: string;
}

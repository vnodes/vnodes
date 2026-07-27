import { workspaceRoot } from '@nx/devkit';
import { getGitEmail, getGitOriginUrl, getGitRepoName } from './git-helpers.js';

describe('git-helpers', () => {
  const origin = getGitOriginUrl(workspaceRoot);
  const orignName = getGitRepoName(origin);
  const repoName = getGitRepoName(origin);
  const email = getGitEmail(workspaceRoot);

  it('should get the email address', () => {
    expect(email).toEqual('robert.brightline@gmail.com');
  });

  it('should get the orign url', () => {
    expect(origin).toEqual('https://github.com/vnodes/vnodes.git');
  });

  it('should get the origin name', () => {
    expect(orignName).toEqual('vnodes');
  });

  it('should get the repo name', () => {
    expect(repoName).toEqual('vnodes');
  });
});

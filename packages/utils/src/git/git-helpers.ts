import { execSync } from 'node:child_process';
import { basename } from 'node:path';

export function getGitOriginUrl(workingDirectory: string) {
  return execSync(`git remote get-url origin`, {
    encoding: 'utf8',
    stdio: 'pipe',
    cwd: workingDirectory,
  })
    .trim()
    .replace(/\t\n/g, '');
}

export function getGitHubPageUrl(originUrl: string) {
  return `https://${getGitOriginName(originUrl)}.github.io/${getGitRepoName(originUrl)}`;
}

export function getGitOriginName(originUrl: string) {
  const [, originName] = originUrl.split('://')[1].split('/');
  return originName;
}

export function getGitRepoName(originUrl: string) {
  return basename(originUrl.replace(/\.git$/, ''));
}

export function getGitEmail(workingDirectory: string) {
  return execSync('git config --global user.email', {
    encoding: 'utf-8',
    stdio: 'pipe',
    cwd: workingDirectory,
  }).trim();
}

export function getGitAuthorName(workingDirectory: string) {
  return execSync('git config --global user.name', {
    encoding: 'utf-8',
    stdio: 'pipe',
    cwd: workingDirectory,
  }).trim();
}

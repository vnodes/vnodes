import { getProjects, type ProjectConfiguration, type Tree } from '@nx/devkit';

export function inferProjectConfiguration(tree: Tree): ProjectConfiguration {
  const cwd = process.cwd();

  const projects = getProjects(tree);

  for (const p of projects.values()) {
    if (cwd.includes(p.root)) {
      return p;
    }
  }
  throw new Error(`Project not found`);
}

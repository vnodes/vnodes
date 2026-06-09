import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing.js';
import { type Tree, readProjectConfiguration } from '@nx/devkit';
import { projectGenerator } from './project.js';
import type { ProjectGeneratorSchema } from './schema.d.js';

describe('project generator', () => {
  let tree: Tree;
  const options: ProjectGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await projectGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

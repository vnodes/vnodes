import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { projectGenerator } from './project.js';
import { ProjectGeneratorSchema } from './schema.js';

vi.mock('@nx/devkit', async () => {
    const actual = await vi.importActual('@nx/devkit');
    return {
        ...actual,
        updateJson: vi.fn(),
    };
});
describe('project generator', () => {
    describe('generate library', () => {
        const tree: Tree = createTreeWithEmptyWorkspace();
        const options = new ProjectGeneratorSchema({
            directory: 'test/test',
            projectType: 'lib',
        });

        it('should run successfully', async () => {
            await projectGenerator(tree, options);
        });
    });
});

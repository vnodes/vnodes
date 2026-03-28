import { readProjectConfiguration, type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { projectGenerator } from './project.js';
import { ProjectGeneratorSchema } from './schema.d.js';

describe('project generator', () => {
    describe('generate library', () => {
        const tree: Tree = createTreeWithEmptyWorkspace();
        const options: ProjectGeneratorSchema = new ProjectGeneratorSchema({
            directory: 'test/test',
            projectType: 'lib',
        });

        it('should run successfully', async () => {
            await projectGenerator(tree, options);
            const config = readProjectConfiguration(tree, 'test');
            expect(config).toBeDefined();
        });
    });
});

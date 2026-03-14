import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { apiE2eGenerator } from './api-e2e';
import { ApiE2eGeneratorSchema } from './schema';

describe('api-e2e generator', () => {
    let tree: Tree;
    const options: ApiE2eGeneratorSchema = { name: 'test' };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await apiE2eGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'test');
        expect(config).toBeDefined();
    });
});

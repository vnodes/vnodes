import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import componentGenerator from './component';
import type { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
    describe('generate component', () => {
        const tree: Tree = createTreeWithEmptyWorkspace();
        const options: ComponentGeneratorSchema = {
            name: 'input-text',
            prefix: 'vn',
        };

        it('should run successfully', async () => {
            await componentGenerator(tree, options);
        });
    });
});

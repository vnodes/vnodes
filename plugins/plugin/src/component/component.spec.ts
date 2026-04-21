import { addProjectConfiguration, readJson, type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import componentGenerator from './component';
import type { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
    let tree: Tree;
    const options: ComponentGeneratorSchema = {
        name: 'input-text',
        project: 'ui-kit',
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();

        // 1. Setup mock project environment
        addProjectConfiguration(tree, options.project, {
            root: 'libs/ui-kit',
            sourceRoot: 'libs/ui-kit/src',
            projectType: 'library',
            targets: {},
        });

        // 2. Add required files for the generator to modify
        tree.write(
            'libs/ui-kit/package.json',
            JSON.stringify({
                name: '@vnodes/ui-kit',
                exports: {
                    './package.json': './package.json',
                },
            }),
        );

        tree.write(
            'libs/ui-kit/tsconfig.lib.json',
            JSON.stringify({
                compilerOptions: {
                    paths: {},
                },
            }),
        );
    });

    it('should generate files in the correct directory', async () => {
        await componentGenerator(tree, options);

        // Verify files exist (assuming your 'files' folder has a public-api.ts)
        expect(tree.exists('libs/ui-kit/src/input-text/public-api.ts')).toBeTruthy();
    });

    it('should update tsconfig.lib.json with the new path mapping', async () => {
        await componentGenerator(tree, options);

        const tsconfig = readJson(tree, 'libs/ui-kit/tsconfig.lib.json');

        // The project name comes from package.json ('@vnodes/ui-kit')
        expect(tsconfig.compilerOptions.paths['@vnodes/ui-kit/input-text']).toEqual(['./src/input-text/public-api.ts']);
    });

    it('should update package.json with subpath exports', async () => {
        await componentGenerator(tree, options);

        const packageJson = readJson(tree, 'libs/ui-kit/package.json');

        expect(packageJson.exports['./input-text']).toEqual({
            types: './src/input-text/public-api.ts',
            default: './src/input-text/public-api.ts',
        });
    });

    it('should throw an error if the component already exists', async () => {
        // Create a dummy file to trigger the OverwriteStrategy.ThrowIfExisting
        tree.write('libs/ui-kit/src/input-text/public-api.ts', '');

        await expect(componentGenerator(tree, options)).rejects.toThrow();
    });
});

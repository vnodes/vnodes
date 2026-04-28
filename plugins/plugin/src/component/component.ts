import { join } from 'node:path';
import {
    formatFiles,
    generateFiles,
    names,
    OverwriteStrategy,
    readJson,
    readProjectConfiguration,
    type Tree,
    updateJson,
    workspaceRoot,
} from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
    let { root, prefix, sourceRoot } = (await readProjectConfiguration(tree, options.project)) as {
        root: string;
        prefix: string;
        sourceRoot: string;
    };
    sourceRoot ??= join(root, 'src');
    const packageJsonFilePath = join(root, 'package.json');
    const tsconfigLibJsonFilePath = join(workspaceRoot, 'tsconfig.base.json');
    const { name: project } = await readJson(tree, packageJsonFilePath);
    const nameVariants = names(options.name);
    generateFiles(
        tree,
        join(__dirname, 'files'),
        sourceRoot,
        { project, prefix, ...nameVariants },
        { overwriteStrategy: OverwriteStrategy.ThrowIfExisting },
    );

    // update tsconfig.lib.json references
    await updateJson(tree, tsconfigLibJsonFilePath, (value) => {
        value.compilerOptions ??= {};
        value.compilerOptions.paths ??= {};
        const referenceName = `${project}/${nameVariants.fileName}`;

        if (value.compilerOptions.paths[referenceName]) {
            throw new Error(`Reference path ${referenceName} already exists`);
        }

        const referencePath = `${sourceRoot}/${nameVariants.fileName}/public-api.ts`;

        value.compilerOptions.paths[referenceName] = [referencePath];
        return value;
    });

    // Update package.json exports

    // "./flex": {
    //   "types": "./src/flex/public-api.ts",
    //   "default": "./src/flex/public-api.ts"
    // },

    await updateJson(tree, packageJsonFilePath, (value) => {
        value.exports ??= {};

        value.exports[`./${nameVariants.fileName}`] = {
            types: `./src/${nameVariants.fileName}/public-api.ts`,
            default: `./src/${nameVariants.fileName}/public-api.ts`,
        };
        return value;
    });

    // Add tsconfig reference
    await formatFiles(tree);
}

export default componentGenerator;

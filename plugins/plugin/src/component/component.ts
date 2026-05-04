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
} from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
    let { root, prefix, sourceRoot } = (await readProjectConfiguration(tree, options.project)) as {
        root: string;
        prefix: string;
        sourceRoot: string;
    };
    sourceRoot ??= join(root, 'src');
    const packageJSONPath = join(root, 'package.json');
    const tsconfigJSONPath = tree.exists('tsconfig.base.json') ? 'tsconfig.base.json' : 'tsconfig.json';
    const { name: project } = await readJson(tree, packageJSONPath);
    const nameVariants = names(options.name);
    
    generateFiles(
        tree,
        join(__dirname, 'files'),
        sourceRoot,
        { project, prefix, ...nameVariants },
        { overwriteStrategy: OverwriteStrategy.ThrowIfExisting },
    );

    // update tsconfig.lib.json references
    await updateJson(tree, tsconfigJSONPath, (value) => {
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

    // update exports
    await updateJson(tree, packageJSONPath, (value) => {
        value.exports ??= {};

        value.exports[`./${nameVariants.fileName}`] = {
            types: `./src/${nameVariants.fileName}/public-api.ts`,
            default: `./src/${nameVariants.fileName}/public-api.ts`,
        };
        return value;
    });

    await formatFiles(tree);
}

export default componentGenerator;

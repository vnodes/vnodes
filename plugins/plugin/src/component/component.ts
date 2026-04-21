import {
    formatFiles,
    generateFiles,
    joinPathFragments,
    names,
    OverwriteStrategy,
    readJson,
    readProjectConfiguration,
    type Tree,
    updateJson,
} from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
    const { root, prefix } = (await readProjectConfiguration(tree, options.project)) as {
        root: string;
        prefix: string;
    };
    const sourceRoot = joinPathFragments(root, 'src');
    const packageJsonFilePath = joinPathFragments(root, 'package.json');
    const tsconfigLibJsonFilePath = joinPathFragments(root, 'tsconfig.lib.json');
    const { name: project } = await readJson(tree, packageJsonFilePath);

    const nameVariants = names(options.name);
    generateFiles(
        tree,
        joinPathFragments(__dirname, 'files'),
        sourceRoot,
        {
            project,
            prefix,
            ...nameVariants,
        },
        { overwriteStrategy: OverwriteStrategy.ThrowIfExisting },
    );

    // update tsconfig.lib.json references
    await updateJson(tree, tsconfigLibJsonFilePath, (value) => {
        value.compilerOptions ??= {};
        value.compilerOptions.paths ??= {};
        const referencePath = `${project}/${nameVariants.fileName}`;

        if (value.compilerOptions.paths[referencePath]) {
            throw new Error(`Reference path ${referencePath} already exists`);
        }

        value.compilerOptions.paths[referencePath] = [`./src/${nameVariants.fileName}/public-api.ts`];
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

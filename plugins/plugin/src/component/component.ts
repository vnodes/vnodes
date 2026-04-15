import * as path from 'node:path';
import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
    generateFiles(tree, path.join(__dirname, 'files'), '', {
        ...options,
        ...names(options.name),
    });
    await formatFiles(tree);
}

export default componentGenerator;

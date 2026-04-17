import * as path from 'node:path';
import { cwd } from 'node:process';
import { formatFiles, generateFiles, names, OverwriteStrategy, type Tree, workspaceRoot } from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
    const target = cwd().replace(workspaceRoot, '');
    generateFiles(
        tree,
        path.join(__dirname, 'files'),
        target,
        {
            ...options,
            ...names(options.name),
        },
        { overwriteStrategy: OverwriteStrategy.ThrowIfExisting },
    );
    await formatFiles(tree);
}

export default componentGenerator;

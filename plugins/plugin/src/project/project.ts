import * as path from 'node:path';
import { formatFiles, generateFiles, names, type Tree, updateJson } from '@nx/devkit';
import { ProjectGeneratorSchema } from './schema.js';

export async function projectGenerator(tree: Tree, options: ProjectGeneratorSchema) {
    options = new ProjectGeneratorSchema(options);
    const projectRoot = options.directory;
    const shortProjectName = options.directory.split(/\//).pop();
    if (!shortProjectName)
        throw new Error(`Something went wrong extracting the project name from ${options.directory}`);

    const projectName = `@${options.orgname}/${shortProjectName}`;
    const shortProjectNames = names(shortProjectName);

    options.email = options.email.split('@').join(`+${options.reponame}-${shortProjectNames.fileName}@`);

    generateFiles(tree, path.join(__dirname, options.projectType), projectRoot, {
        ...shortProjectNames,
        projectName,
        ...options,
    });

    await updateJson(tree, 'tsconfig.json', (value) => {
        value.references ??= [];

        const refPath = `./${options.directory}`;
        if (!value.references.find((ref: { path: string }) => ref.path === refPath)) {
            value.references.push({ path: `./${options.directory}` });
        }
        return value;
    });
    await formatFiles(tree);
}

export default projectGenerator;

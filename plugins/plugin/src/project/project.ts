import * as path from 'node:path';
import { addProjectConfiguration, formatFiles, generateFiles, names, type Tree } from '@nx/devkit';
import { ProjectGeneratorSchema } from './schema.d.js';

export async function projectGenerator(tree: Tree, options: ProjectGeneratorSchema) {
    options = new ProjectGeneratorSchema(options);
    const projectRoot = options.directory;
    const shortProjectName = options.directory.split(/\//).pop();
    if (!shortProjectName)
        throw new Error(`Something went wrong extracting the project name from ${options.directory}`);

    const projectName = `@${options.orgname}/${shortProjectName}`;
    const shortProjectNames = names(shortProjectName);

    addProjectConfiguration(tree, shortProjectName, {
        root: projectRoot,
        projectType: 'library',
        sourceRoot: `${projectRoot}/src`,
        targets: {},
    });
    generateFiles(tree, path.join(__dirname, options.projectType), projectRoot, {
        ...shortProjectNames,

        projectName,
        ...options,
    });
    await formatFiles(tree);
}

export default projectGenerator;

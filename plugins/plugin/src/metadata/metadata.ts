import * as path from 'node:path';
import { formatFiles, generateFiles, getProjects, type Tree } from '@nx/devkit';

export async function metadataGenerator(tree: Tree) {
    const projectRoot = `metadata`;

    const projects = getProjects(tree);

    console.log(projects);
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
        content: `{ }`,
    });
    await formatFiles(tree);
}

export default metadataGenerator;

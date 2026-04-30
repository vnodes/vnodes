/** biome-ignore-all lint/suspicious/noExplicitAny: Any */
import * as path from 'node:path';
import { formatFiles, generateFiles, getProjects, type Tree } from '@nx/devkit';
import { readJsonFile } from '@vnodes/fs';

export async function metadataGenerator(tree: Tree) {
    const projectRoot = `public`;

    const projects = getProjects(tree);

    const projectsMetadata = await Promise.all(
        projects.entries().map(async ([, { root }]) => {
            const { name, description, version, icon, homepage, funding, dependencies, peerDependencies } =
                await readJsonFile<any>(`${root}/package.json`);
            return { name, description, version, icon, homepage, funding, dependencies, peerDependencies };
        }),
    );

    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
        content: JSON.stringify(projectsMetadata),
    });
    await formatFiles(tree);
}

export default metadataGenerator;

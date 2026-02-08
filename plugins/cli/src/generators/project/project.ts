import { join } from "node:path";
import { formatFiles, generateFiles, names, type Tree } from "@nx/devkit";
import type { ProjectGeneratorSchema } from "./schema";

export async function projectGenerator(tree: Tree, options: ProjectGeneratorSchema) {
    const parts = options.directory.split(/\//);
    const shortProjectName = parts[parts.length - 1];
    const projectName = `@${options.org}/${shortProjectName}`;

    const email = options.email.replace("@", `+${options.org}-${shortProjectName}@`);

    generateFiles(tree, join(__dirname, options.type), options.directory, {
        projectName,
        directory: options.directory,
        email,
        homepage: options.homepage,
        org: options.org,
        ...names(shortProjectName),
    });
    await formatFiles(tree);
}

export default projectGenerator;

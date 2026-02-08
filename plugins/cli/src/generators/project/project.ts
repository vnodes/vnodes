import * as path from "node:path";
import { formatFiles, generateFiles, type Tree } from "@nx/devkit";
import type { ProjectGeneratorSchema } from "./schema";

export async function projectGenerator(tree: Tree, options: ProjectGeneratorSchema) {
    generateFiles(tree, path.join(__dirname, "files"), options.directory, options);
    await formatFiles(tree);
}

export default projectGenerator;

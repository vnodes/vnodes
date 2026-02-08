import {
  formatFiles,
  generateFiles,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { ProjectGeneratorSchema } from './schema';

export async function projectGenerator (tree: Tree, options: ProjectGeneratorSchema) {
       generateFiles(tree, path.join(__dirname, 'files'), options.directory, options);
  await formatFiles(tree);
}

export default projectGenerator;

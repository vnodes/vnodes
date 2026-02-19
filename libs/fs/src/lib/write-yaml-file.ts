import { dump } from 'js-yaml';
import { writeTextFile } from './write-text-file.js';

export async function writeYamlFile<T>(filePath: string, content: T, controller?: AbortController) {
    return await writeTextFile(filePath, dump(content), controller);
}

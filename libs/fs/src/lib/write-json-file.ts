import { writeTextFile } from './write-text-file.js';

export async function writeJsonFile<T>(filePath: string, content: T, controller?: AbortController) {
    return await writeTextFile(filePath, JSON.stringify(content, undefined, 2), controller);
}

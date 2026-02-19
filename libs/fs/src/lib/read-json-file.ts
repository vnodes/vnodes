import { readTextFile } from './read-text-file.js';

export async function readJsonFile<T>(filePath: string, controller?: AbortController): Promise<T> {
    const text = await readTextFile(filePath, controller);
    return JSON.parse(text) as T;
}

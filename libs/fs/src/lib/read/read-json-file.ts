import { readTextFile } from './read-text-file.js';

export async function readJsonFile<T>(filepath: string, abortController?: AbortController) {
    const text = await readTextFile(filepath, abortController);
    return JSON.parse(text) as T;
}

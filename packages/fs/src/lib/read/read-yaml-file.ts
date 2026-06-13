import { load } from 'js-yaml';
import { readTextFile } from './read-text-file.js';

export async function readYamlFile<T>(filepath: string, abortController?: AbortController) {
    const text = await readTextFile(filepath, abortController);
    return load(text) as T;
}

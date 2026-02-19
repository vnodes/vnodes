import { load } from 'js-yaml';
import { readTextFile } from './read-text-file.js';

export async function readYamlFile<T>(filePath: string, controller?: AbortController): Promise<T> {
    const text = await readTextFile(filePath, controller);
    return (await load(text)) as T;
}

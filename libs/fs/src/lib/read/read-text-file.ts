import { readFile } from 'node:fs/promises';

export function readTextFile(filepath: string, abortController?: AbortController) {
    return readFile(filepath, { encoding: 'utf-8', signal: abortController?.signal });
}

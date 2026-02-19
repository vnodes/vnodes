import { readFile } from 'node:fs/promises';

export async function readTextFile(filePath: string, controller?: AbortController) {
    return await readFile(filePath, {
        encoding: 'utf-8',
        signal: controller?.signal,
    });
}

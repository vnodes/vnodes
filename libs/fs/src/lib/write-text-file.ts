import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function writeTextFile(filePath: string, content: string, controller?: AbortController) {
    const directory = dirname(filePath);

    await mkdir(directory, { recursive: true });
    return await writeFile(filePath, content, {
        encoding: 'utf-8',
        signal: controller?.signal,
    });
}

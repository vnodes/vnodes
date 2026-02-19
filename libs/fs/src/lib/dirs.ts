import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';

export async function dirs(filePath: string): Promise<Dirent[]> {
    return await readdir(filePath, {
        withFileTypes: true,
        recursive: true,
        encoding: 'utf-8',
    });
}

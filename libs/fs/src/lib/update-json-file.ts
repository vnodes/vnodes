import { readJsonFile } from './read-json-file.js';
import { writeJsonFile } from './write-json-file.js';

export async function updateJsonFile<T>(
    filePath: string,
    updateFn: (value: T) => T,
    controller?: AbortController,
): Promise<T> {
    const content = await readJsonFile(filePath, controller);
    const updatedData = updateFn(content as T);
    await writeJsonFile(filePath, updatedData, controller);
    return updatedData;
}

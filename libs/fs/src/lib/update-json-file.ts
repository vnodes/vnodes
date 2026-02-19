import { readJsonFile } from './read-json-file.js';
import { writeJsonFile } from './write-json-file.js';

export async function updateJsonFile<T>(filePath: string, updateFn: (value: T) => T): Promise<void> {
    const content = await readJsonFile(filePath);
    const updatedContent = updateFn(content as T);
    await writeJsonFile(filePath, updatedContent);
}

import { dump } from 'js-yaml';
import { readYamlFile } from './read-yaml-file.js';
import { writeJsonFile } from './write-json-file.js';

export async function updateYamlFile<T>(
    filePath: string,
    updateFn: (value: T) => T,
    controller?: AbortController,
): Promise<T> {
    const content = await readYamlFile(filePath, controller);
    const updatedContent = updateFn(content as T);
    await writeJsonFile(filePath, dump(updatedContent), controller);
    return updatedContent;
}

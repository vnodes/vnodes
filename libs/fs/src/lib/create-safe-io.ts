import { createSafeResolver } from './create-safe-resolver.js';
import { readJsonFile } from './read-json-file.js';
import { readTextFile } from './read-text-file.js';
import { readYamlFile } from './read-yaml-file.js';
import { updateJsonFile } from './update-json-file.js';
import { updateYamlFile } from './update-yaml-file.js';
import { writeJsonFile } from './write-json-file.js';
import { writeTextFile } from './write-text-file.js';
import { writeYamlFile } from './write-yaml-file.js';

/**
 * Create a scopped IO functions
 *
 * @param rootPath
 * @returns
 */
export function createSafeIO(rootPath: string) {
    const resolve = createSafeResolver(rootPath);
    return {
        readTextFile: (filePath: string, controller?: AbortController) => readTextFile(resolve(filePath), controller),
        readJsonFile: <T>(filePath: string, controller?: AbortController) =>
            readJsonFile<T>(resolve(filePath), controller),
        readYamlFile: (filePath: string, controller?: AbortController) => readYamlFile(resolve(filePath), controller),
        writeTextFile: (filePath: string, content: string, controller?: AbortController) =>
            writeTextFile(resolve(filePath), content, controller),
        writeJsonFile: <T>(filePath: string, content: T, controller?: AbortController) =>
            writeJsonFile(resolve(filePath), content, controller),
        writeYamlFile: <T>(filePath: string, content: T, controller?: AbortController) =>
            writeYamlFile(resolve(filePath), content, controller),
        updateJsonFile: <T>(filePath: string, updateFn: (value: T) => T, controller?: AbortController) =>
            updateJsonFile(resolve(filePath), updateFn, controller),
        updateYamlFile: <T>(filePath: string, updateFn: (value: T) => T, controller?: AbortController) =>
            updateYamlFile(resolve(filePath), updateFn, controller),
    };
}

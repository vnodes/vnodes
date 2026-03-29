import { readJsonFile } from '../read/read-json-file.js';
import { writeJsonFile } from '../write/write-json-file.js';
import { AbstractFile } from './abstract-file.js';

export class JsonFile<T> extends AbstractFile<T> {
    override read() {
        return readJsonFile<T>(this.resolve());
    }
    override async write(content: T) {
        await writeJsonFile<T>(this.resolve(), content);
    }

    override async update(updateFn: (value: T) => T): Promise<void> {
        const content = await this.read();
        const newContent = await updateFn(content);
        await this.write(newContent);
    }
}

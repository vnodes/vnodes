import { readYamlFile } from '../read/read-yaml-file.js';
import { writeYamlFile } from '../write/write-yaml-file.js';
import { AbstractFile } from './abstract-file.js';

export class YamlFile<T> extends AbstractFile<T> {
    override read() {
        return readYamlFile<T>(this.resolve());
    }
    
    override async write(content: T) {
        await writeYamlFile<T>(this.resolve(), content);
    }

    override async update(updateFn: (value: T) => T): Promise<void> {
        const content = await this.read();
        const newContent = await updateFn(content);
        await this.write(newContent);
    }
}

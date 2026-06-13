import { readTextFile } from '../read/read-text-file.js';
import { writeTextFile } from '../write/write-text-file.js';
import { AbstractFile } from './abstract-file.js';

export class TextFile extends AbstractFile<string> {
    override read() {
        return readTextFile(this.resolve());
    }
    override async write(content: string) {
        await writeTextFile(this.resolve(), content);
    }

    override async update(updateFn: (value: string) => string): Promise<void> {
        const content = await this.read();
        const newContent = await updateFn(content);
        await this.write(newContent);
    }
}

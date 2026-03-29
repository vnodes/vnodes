import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { workspaceRoot } from '@nx/devkit';
import { relativeScope } from '../path/scope.js';
import { writeTextFile } from '../write/write-text-file.js';
import { readTextFile } from './read-text-file.js';

describe('readTextFile', () => {
    const resolve = relativeScope(join(workspaceRoot, 'tmp', 'test', 'readTextFile'));
    const filepath = resolve('test.txt');

    beforeAll(async () => {
        await writeTextFile(filepath, 'true');
    });

    afterAll(async () => {
        await rm(resolve(), { recursive: true });
    });

    it('should read json file', async () => {
        const content = await readTextFile(filepath);
        expect(content).toEqual('true');
    });
});

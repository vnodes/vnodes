import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { workspaceRoot } from '@nx/devkit';
import { relativeScope } from '../path/scope.js';
import { writeJsonFile } from '../write/write-json-file.js';
import { readJsonFile } from './read-json-file.js';

describe('readJsonFile', () => {
    const resolve = relativeScope(join(workspaceRoot, 'tmp', 'test', 'readJsonFile'));
    const filepath = resolve('test.json');

    beforeAll(async () => {
        await writeJsonFile(filepath, { test: true });
    });

    afterAll(async () => {
        await rm(resolve(), { recursive: true });
    });

    it('should read json file', async () => {
        const content = await readJsonFile<{ test: boolean }>(filepath);
        expect(content.test).toEqual(true);
    });
});

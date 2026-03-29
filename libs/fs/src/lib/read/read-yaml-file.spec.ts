import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { workspaceRoot } from '@nx/devkit';
import { relativeScope } from '../path/scope.js';
import { writeYamlFile } from '../write/write-yaml-file.js';
import { readYamlFile } from './read-yaml-file.js';

describe('readYamlFile', () => {
    const resolve = relativeScope(join(workspaceRoot, 'tmp', 'test', 'readYamlFile'));
    const filepath = resolve('test.yaml');

    beforeAll(async () => {
        await writeYamlFile<{ test: true }>(filepath, { test: true });
    });

    afterAll(async () => {
        await rm(resolve(), { recursive: true });
    });

    it('should read json file', async () => {
        const content = await readYamlFile<{ test: true }>(filepath);
        expect(content.test).toEqual(true);
    });
});

import assert from 'node:assert';
import test, { describe } from 'node:test';
import { readTextFile } from './read-text-file.js';

describe('readTextFile', () => {
    test('should read json file', async () => {
        const result = await readTextFile('./src/test-data/test-file.json');
        assert.ok(result);
    });
});

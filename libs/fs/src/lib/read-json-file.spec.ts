import assert from 'node:assert';
import test, { describe } from 'node:test';
import { readJsonFile } from './read-json-file.js';

describe('readJsonFile', () => {
    test('should read json file', async () => {
        const result = await readJsonFile('./src/test-data/test-file.json');
        assert.ok(result);
    });
});

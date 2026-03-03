import assert from 'node:assert';
import test, { describe } from 'node:test';
import { readYamlFile } from './read-yaml-file.js';

describe('readYamlFile', () => {
    test('should read json file', async () => {
        const result = await readYamlFile('./src/test-data/test-file.yaml');
        assert.ok(result);
    });
});

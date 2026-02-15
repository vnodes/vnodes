import assert from 'node:assert';
import test, { describe } from 'node:test';
import { names } from './names.js';

describe('names', () => {
    test('should return names', () => {
        const result = names('some');

        assert.equal(result.camelCase, 'some');
    });
});

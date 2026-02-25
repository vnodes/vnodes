import assert from 'node:assert';
import test, { describe } from 'node:test';
import { str } from './builders.js';

describe('builders', () => {
    test('should work', () => {
        const options = str().minLength(3).maxLength(4).build();
        assert.deepEqual(options, { type: 'string', minLength: 3, maxLength: 4 });
    });
});

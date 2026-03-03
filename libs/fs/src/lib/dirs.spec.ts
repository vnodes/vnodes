import { notEqual } from 'node:assert';
import { ok } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createSafeResolver } from './create-safe-resolver.js';
import { dirs } from './dirs.js';

describe('dirs', () => {
    const resolve = createSafeResolver('./src/test-data');
    it('should list directory entries', async () => {
        const entries = await dirs(resolve());

        ok(Array.isArray(entries));

        notEqual(entries.length, 0);

        ok('path' in entries[0]);
        ok('parentPath' in entries[0]);
        ok('name' in entries[0]);
        ok('isFile' in entries[0]);
        ok('isDirectory' in entries[0]);
    });
});

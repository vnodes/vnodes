import { notEqual } from 'node:assert';
import { ok } from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createSafeResolver } from './create-safe-resolver.js';
import { dirs } from './dirs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('dirs', () => {
    const resolve = createSafeResolver(join(__dirname, '../test-data'));
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

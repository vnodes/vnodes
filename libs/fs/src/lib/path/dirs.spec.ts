import { join } from 'node:path';
import { dirs } from './dirs.js';

describe('dirs', () => {
    it('should read dirs', async () => {
        const d = await dirs(join(__dirname, '..'), { recursive: true });
        expect(d.length > 0);
    });
});

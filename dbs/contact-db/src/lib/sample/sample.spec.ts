import test, { describe } from 'node:test';
import { sample } from './sample.js';

describe('sample', () => {
    test('should initialize', async () => {
        await sample();
    });
});

import assert from 'node:assert';
import test, { describe } from 'node:test';
import { isKebabCase } from './is-kebab-case.js';

describe('isKebabCase', () => {
    describe('valid cases', () => {
        const data = ['s', 'some', 'some-other', 'some-other-other', 'some-thing-and-other'];

        test(' should be valid kebab case', () => {
            for (const d of data) {
                assert.equal(isKebabCase(d), true);
            }
        });
    });

    describe('invalid cases', () => {
        test('should be invalid kebab case', () => {
            const data = ['s ', 'some path', 'Other', 'Other', 'SOME PATH', 'SOMEPAHT'];

            for (const d of data) {
                assert.equal(isKebabCase(d), false);
            }
        });
    });
});

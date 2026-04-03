import { isNumberString } from './is-number-string.js';

describe('isNumberString', () => {
    describe('valid', () => {
        it.each`
            value
            ${'100'}
            ${'.100'}
            ${'100.'}
            ${'100_'}
            ${'100,'}
            ${'100_90'}
            ${'100__0890'}
            ${'100.100'}
            ${'100,100__100'}
        `('isNumberString($value) should return true', ({ value }) => {
            expect(isNumberString(value)).toEqual(true);
        });
    });
});

import { getMethodNames } from './get-method-names.js';

describe('methodNames', () => {
    class Sample {
        property = 'some';
        protected protectedFn() {}
        someFn() {}
        otherFn() {}
    }

    it('should get the method names', () => {
        expect(getMethodNames(Sample)).toEqual(['protectedFn', 'someFn', 'otherFn']);
    });
});

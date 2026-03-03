import assert from 'node:assert';
import test, { describe } from 'node:test';
import 'reflect-metadata';

function _Prop(): PropertyDecorator {
    return (..._args) => {};
}

class Sample {
    some: string;
    other: number;
}

describe('sample', () => {
    test('should work', () => {
        assert.ok(1);

        const some = Reflect.getMetadata('design:type', Sample, 'some');

        console.log('SOME: ', some);
    });
});

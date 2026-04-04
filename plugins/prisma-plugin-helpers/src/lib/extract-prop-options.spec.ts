import { extractPropOptions } from './extract-prop-options.js';

describe('extractAnnotations', () => {
    it('should extract annotations', () => {
        const doc = `@minLength(3) @maxLength(100) @required()`;

        const result = extractPropOptions(doc);

        expect(result.minLength).toEqual('3');
        expect(result.maxLength).toEqual('100');
        expect(result.required).toEqual('true');
    });
});

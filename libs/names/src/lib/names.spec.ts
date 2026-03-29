import { names } from './names.js';

describe('names', () => {
    it('should create names from pascalCase', () => {
        const result = names('PascalCase');

        expect(result.camel).toEqual('pascalCase');
        expect(result.constant).toEqual('PASCAL_CASE');
        expect(result.dot).toEqual('pascal.case');
        expect(result.kebab).toEqual('pascal-case');
        expect(result.sentence).toEqual('Pascal case');
        expect(result.snake).toEqual('pascal_case');
        expect(result.title).toEqual('Pascal Case');
    });
});

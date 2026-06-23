import { coerce } from './coerce.js';
describe('coerce', () => {
  it('should coerce', () => {
    expect(coerce('  ')).toEqual('');
    expect(coerce(true)).toEqual(true);
    expect(coerce('true')).toEqual(true);
    expect(coerce('false')).toEqual(false);
    expect(coerce('{}')).toEqual({});
    expect(coerce('{a: a}')).toEqual({ a: 'a' });
    expect(coerce('{a: 1}')).toEqual({ a: 1 });
    expect(coerce('[1,true, a]')).toEqual([1, true, 'a']);
  });
});

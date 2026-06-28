import { names } from './names.js';
describe('names', () => {
  it.each`
    value
    ${'some'}
    ${'Some'}
    ${'SOME'}
    ${'Some   '}
    ${'   Some   '}
  `('should create names from $value', ({ value }) => {
    const result = names(value);
    expect(result.camel).toEqual('some');
    expect(result.constant).toEqual('SOME');
    expect(result.kebab).toEqual('some');
    expect(result.pascal).toEqual('Some');
    expect(result.sentence).toEqual('Some');
    expect(result.snake).toEqual('some');
    expect(result.title).toEqual('Some');
    expect(result.lower).toEqual('some');
    expect(result.upper).toEqual('SOME');
  });

  it.each`
    value
    ${'someOther'}
    ${'SomeOther'}
    ${'SOME_OTHER'}
    ${'Some   OTHER'}
    ${'   Some  other   '}
  `('should create names from $value', ({ value }) => {
    const result = names(value);
    expect(result.camel).toEqual('someOther');
    expect(result.constant).toEqual('SOME_OTHER');
    expect(result.kebab).toEqual('some-other');
    expect(result.pascal).toEqual('SomeOther');
    expect(result.sentence).toEqual('Some other');
    expect(result.snake).toEqual('some_other');
    expect(result.title).toEqual('Some Other');
    expect(result.upper).toEqual('SOME OTHER');
    expect(result.lower).toEqual('some other');
  });
});

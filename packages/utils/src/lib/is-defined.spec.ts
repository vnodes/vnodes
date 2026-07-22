import { isDefined } from './is-defined.js';
describe('isDefined', () => {
  it.each`
    value        | expected
    ${undefined} | ${false}
    ${null}      | ${false}
    ${1}         | ${true}
    ${0}         | ${true}
    ${-1}        | ${true}
    ${NaN}       | ${true}
    ${''}        | ${true}
  `('isDefined($value) should return $expected', ({ value, expected }) => {
    expect(isDefined(value)).toEqual(expected);
  });

  it.each`
    value        | handler    | expected
    ${undefined} | ${vi.fn()} | ${false}
    ${null}      | ${vi.fn()} | ${false}
    ${1}         | ${vi.fn()} | ${true}
    ${0}         | ${vi.fn()} | ${true}
    ${-1}        | ${vi.fn()} | ${true}
    ${NaN}       | ${vi.fn()} | ${true}
    ${''}        | ${vi.fn()} | ${true}
    ${'some'}    | ${vi.fn()} | ${true}
  `('isDefined($value, handler) should return $expected', ({ value, handler, expected }) => {
    expect(isDefined(value, handler)).toEqual(expected);
    if (expected === true) {
      expect(handler).toHaveBeenCalledWith(value);
    } else {
      expect(handler).not.toHaveBeenCalled();
    }
  });
});

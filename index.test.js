const { memoizeOne } = require('./index');

describe('memoizeOne', () => {
  const add = function (a, b) {
    return { result: a + b };
  };

  test('function should be called once with same argument', () => {
    const mockFn = jest.fn(add);
    const memoized = memoizeOne(mockFn);

    // This ensures the same object/value is returned
    // Not only same in terms of value but reference too
    // It internally uses === operator
    expect(memoized(1, 2)).toBe(memoized(1, 2));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('function should be called once when it returns no value', () => {
    const mockFn = jest.fn();
    const memoized = memoizeOne(mockFn);

    expect(memoized()).toBe(memoized());

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('function should be called when different arguments are provided', () => {
    const mockFn = jest.fn(add);
    const memoized = memoizeOne(mockFn);

    memoized(1, 2);
    memoized(1, 2);
    memoized(3, 4);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test('only last invocation should be memoized', () => {
    const mockFn = jest.fn(add);
    const memoized = memoizeOne(mockFn);

    memoized(1, 2);
    memoized(3, 4);
    memoized(1, 2);

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test.skip('clear function should work', () => {
    const mockFn = jest.fn(add);
    const memoized = memoizeOne(mockFn);

    const ret1 = memoized(1, 2);
    memoized.clear();
    const ret2 = memoized(1, 2);

    expect(ret1).toEqual({ result: 3 });
    expect(ret2).toEqual({ result: 3 });
    expect(ret1).not.toBe(ret2);
  });

  test.skip('this should be treated as an input', () => {
    const mockFn = jest.fn(add);
    const memoized = memoizeOne(mockFn);

    memoized.call({}, 1, 2);
    memoized.call({ a: 1 }, 1, 2);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

import { isObjectInSet } from './isObjectInSet';

describe('isObjectInSet', () => {
  test('returns true when the object is in the set (same reference)', () => {
    const obj = { r: 1, c: 2 };
    const set = new Set([obj]);

    expect(isObjectInSet({ set, obj: obj })).toBe(true);
  });

  test('returns true when the object with equivalent values is in the set', () => {
    const obj1 = { r: 1, c: 2 };
    const obj2 = { r: 1, c: 2 }; // Different reference, but same values
    const set = new Set([obj1]);

    expect(isObjectInSet({ set, obj: obj2 })).toBe(true);
  });

  test('returns false when the object with different values is in the set', () => {
    const obj1 = { r: 1, c: 2 };
    const obj2 = { r: 2, c: 3 };
    const set = new Set([obj1]);

    expect(isObjectInSet({ set, obj: obj2 })).toBe(false);
  });

  test('returns false when the object is not in the set', () => {
    const obj = { r: 1, c: 2 };
    const set = new Set();
    // @ts-expect-error - ignore
    expect(isObjectInSet({ set, obj: obj })).toBe(false);
  });

  test('returns false for an empty set', () => {
    const obj = { r: 1, c: 2 };
    const set = new Set();
    // @ts-expect-error - ignore
    expect(isObjectInSet({ set, obj: obj })).toBe(false);
  });

  test('works with sets containing multiple objects', () => {
    const obj1 = { r: 1, c: 2 };
    const obj2 = { r: 2, c: 3 };
    const obj3 = { r: 3, c: 4 };
    const set = new Set([obj1, obj2]);

    expect(isObjectInSet({ set, obj: obj1 })).toBe(true);
    expect(isObjectInSet({ set, obj: obj2 })).toBe(true);
    expect(isObjectInSet({ set, obj: obj3 })).toBe(false);
  });

  test('returns true when set contains objects with nested structures', () => {
    const obj1 = { r: 1, c: 2, nested: { key: 'value' } };
    const obj2 = { r: 1, c: 2, nested: { key: 'value' } }; // Different reference, but same nested values
    const set = new Set([obj1]);

    expect(isObjectInSet({ set, obj: obj2 })).toBe(true);
  });
});

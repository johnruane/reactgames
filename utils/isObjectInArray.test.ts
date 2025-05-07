import { isObjectInArray } from './isObjectInArray';

describe('isObjectInArray', () => {
  it('should return true if the value exists in the array (shallow comparison)', () => {
    const object = { r: 2, c: 3 };
    const array = [
      { r: 1, c: 2 },
      { r: 2, c: 3 },
      { r: 4, c: 5 },
    ];

    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(true);
  });

  it('should return false if the value does not exist in the array (shallow comparison)', () => {
    const object = { r: 2, c: 3 };
    const array = [
      { r: 1, c: 2 },
      { r: 3, c: 4 },
      { r: 4, c: 5 },
    ];

    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(false);
  });

  it('should return true for deep equality (nested objects)', () => {
    const object = { r: 2, c: 3, nested: { x: 1 } };
    const array = [
      { r: 1, c: 2, nested: { x: 0 } },
      { r: 2, c: 3, nested: { x: 1 } },
      { r: 4, c: 5, nested: { x: 2 } },
    ];

    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(true);
  });

  it('should return false for non-matching deep nested objects', () => {
    const object = { r: 2, c: 3, nested: { x: 1 } };
    const array = [
      { r: 1, c: 2, nested: { x: 0 } },
      { r: 2, c: 3, nested: { x: 2 } },
      { r: 4, c: 5, nested: { x: 3 } },
    ];

    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(false);
  });

  it('should return false if the array is empty', () => {
    const object = { r: 2, c: 3 };
    const array = [];

    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(false);
  });

  it('should return false if value is null', () => {
    const object = null;
    const array = [
      { r: 1, c: 2 },
      { r: 2, c: 3 },
    ];
    // @ts-expect-error - ignore
    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(false);
  });

  it('should return false if array contains null or undefined values', () => {
    const object = { r: 2, c: 3 };
    const array = [null, undefined, { r: 4, c: 5 }];
    // @ts-expect-error - ignore
    const result = isObjectInArray({ array, obj: object });
    expect(result).toBe(false);
  });
});

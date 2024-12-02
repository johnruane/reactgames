import { removeObjectFromArray } from '../removeObjectFromArray';

describe('removeObjectFromArray', () => {
  it('should remove the correct object from the array', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ];
    const obj = { y: 4, x: 3 };
    // @ts-expect-error - ignore
    expect(removeObjectFromArray({ array, obj })).toEqual([
      { x: 1, y: 2 },
      { x: 5, y: 6 },
    ]);
  });

  it('should not remove anything if the object does not exist in the array', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ];
    const obj = { x: 7, y: 8 };
    // @ts-expect-error - ignore
    expect(removeObjectFromArray({ array, obj })).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
  });

  it('should remove all matching objects if there are duplicates', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 3, y: 4 },
    ];
    const obj = { x: 3, y: 4 };
    // @ts-expect-error - ignore
    expect(removeObjectFromArray({ array, obj })).toEqual([{ x: 1, y: 2 }]);
  });

  it('should handle an empty array', () => {
    const array = [];
    const obj = { x: 1, y: 2 };
    // @ts-expect-error - ignore
    expect(removeObjectFromArray({ array, obj })).toEqual([]);
  });

  it('should handle arrays with non-object elements and still work', () => {
    const array = [1, { x: 3, y: 4 }, 'string', { x: 5, y: 6 }];
    const obj = { x: 3, y: 4 };
    // @ts-expect-error - ignore
    expect(removeObjectFromArray({ array, obj })).toEqual([
      1,
      'string',
      { x: 5, y: 6 },
    ]);
  });
});

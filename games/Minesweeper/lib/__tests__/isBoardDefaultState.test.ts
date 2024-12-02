import { isBoardDefaultState } from '../isBoardDefaultState';

describe('isBoardDefaultState', () => {
  it('should return true if all cells equal -1', () => {
    const testBoard = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    expect(isBoardDefaultState({ board: testBoard })).toEqual(true);
  });

  it('should return false if one cell is not -1', () => {
    const testBoard = [
      [-1, -1, 0],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    expect(isBoardDefaultState({ board: testBoard })).toEqual(false);
  });

  it('should return false if multiple cells are not -1', () => {
    const testBoard = [
      [5, -1, 0],
      [-1, -1, -1],
      [10, -1, -1],
    ];

    expect(isBoardDefaultState({ board: testBoard })).toEqual(false);
  });
});

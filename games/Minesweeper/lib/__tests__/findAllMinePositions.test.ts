import { findAllMinePositions } from '../findAllMinePositions';

describe('findAllMinePositions', () => {
  it('should return an empty array when the board has no mines', () => {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    const result = findAllMinePositions({ board });
    expect(result).toEqual([]);
  });

  it('should return positions of all mines on the board', () => {
    const board = [
      [0, 1, 9],
      [3, 9, 5],
      [9, 7, 8],
    ];

    const result = findAllMinePositions({ board });
    expect(result).toEqual([
      { r: 0, c: 2 },
      { r: 1, c: 1 },
      { r: 2, c: 0 },
    ]);
  });

  it('should return positions of mines when the entire board is filled with mines', () => {
    const board = [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ];

    const result = findAllMinePositions({ board });
    expect(result).toEqual([
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 1, c: 2 },
      { r: 2, c: 0 },
      { r: 2, c: 1 },
      { r: 2, c: 2 },
    ]);
  });

  it('should return an empty array when the board is empty', () => {
    const board: number[][] = [];

    const result = findAllMinePositions({ board });
    expect(result).toEqual([]);
  });

  it('should handle undefined or null board by returning an empty array', () => {
    expect(findAllMinePositions({ board: null as any })).toEqual([]);
    expect(findAllMinePositions({ board: undefined as any })).toEqual([]);
  });

  it('should correctly identify no mines on a mixed board', () => {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    const result = findAllMinePositions({ board });
    expect(result).toEqual([]);
  });
});

import { generateCluesBoard } from '../generateCluesBoard';

describe('generateCluesBoard', () => {
  it('should count mines correctly for a simple 3x3 board', () => {
    const board = [
      [0, 9, 0],
      [0, 0, 0],
      [0, 9, 0],
    ];

    const expectedBoard = [
      [1, 9, 1],
      [2, 2, 2],
      [1, 9, 1],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect([...result]).toEqual(expect.arrayContaining(expectedBoard));
  });

  it('should not modify cells that do not match the emptyCellValue', () => {
    const board = [
      [1, 9, 2],
      [0, 0, 0],
      [3, 9, 4],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect([...result]).toEqual(expect.arrayContaining(board));
  });

  it('should handle edges and corners correctly', () => {
    const board = [
      [9, 0, 9],
      [0, 0, 0],
      [9, 0, 9],
    ];

    const expectedBoard = [
      [9, 2, 9],
      [2, 4, 2],
      [9, 2, 9],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect(result).toEqual(expectedBoard);
  });

  it('should handle an empty board', () => {
    const board: number[][] = [];

    const expectedBoard: number[][] = [];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect(result).toEqual(expectedBoard);
  });

  it('should handle a board with no mines', () => {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const expectedBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect(result).toEqual(expectedBoard);
  });

  it('should handle a board where all cells are mines', () => {
    const board = [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ];

    const expectedBoard = [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect(result).toEqual(expectedBoard);
  });

  it('should handle non-square boards', () => {
    const board = [
      [0, 9, 0],
      [0, 0, 0],
    ];

    const expectedBoard = [
      [1, 9, 1],
      [1, 1, 1],
    ];

    const result = generateCluesBoard({ board, emptyCellValue: 0 });
    expect(result).toEqual(expectedBoard);
  });
});

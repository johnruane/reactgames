import { updateDisplayBoard } from '../updateDisplayBoard';
import { vi } from 'vitest';

describe('updateDisplayBoard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update the display board with correct cell values', () => {
    const displayBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const gameBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const cellsToUpdate = [
      { r: 0, c: 0 },
      { r: 1, c: 1 },
      { r: 2, c: 2 },
    ];

    const updatedBoard = updateDisplayBoard({
      displayBoard,
      gameBoard,
      cellsToUpdate,
    });

    // Expected board after update
    const expectedBoard = [
      [1, 0, 0],
      [0, 5, 0],
      [0, 0, 9],
    ];

    expect(updatedBoard).toEqual(expectedBoard);
  });

  it('should update the display board without overwriting existing cell values', () => {
    const displayBoard = [
      [4, 0, 0],
      [0, 0, 0],
      [5, 0, 7],
    ];

    const gameBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const cellsToUpdate = [{ r: 1, c: 1 }];

    const updatedBoard = updateDisplayBoard({
      displayBoard,
      gameBoard,
      cellsToUpdate,
    });

    // Expected board after update
    const expectedBoard = [
      [4, 0, 0],
      [0, 5, 0],
      [5, 0, 7],
    ];

    expect(updatedBoard).toEqual(expectedBoard);
  });

  it('should not update display board if getCellValue returns null', () => {
    const displayBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const gameBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const cellsToUpdate = [
      { r: 0, c: 0 },
      { r: 1, c: -1 },
      { r: 1, c: 4 },
    ];

    const updatedBoard = updateDisplayBoard({
      displayBoard,
      gameBoard,
      cellsToUpdate,
    });

    const expectedBoard = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    expect(updatedBoard).toEqual(expectedBoard);
  });
});

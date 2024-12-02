import { findNeighbourCells } from '../findNeighbourCells';

describe('findNeighbourCells', () => {
  it('should find neighbors with a value of 0 (default predicate)', () => {
    const board = [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ];
    const result = findNeighbourCells({ board, pos: { r: 1, c: 1 } });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 0, c: 0 },
        { r: 2, c: 2 },
      ]),
    );
  });

  it('should find neighbors based on a custom predicate (cell value equals 9)', () => {
    const board = [
      [1, 1, 9],
      [9, 0, 1],
      [1, 1, 1],
    ];
    const result = findNeighbourCells({
      board,
      pos: { r: 1, c: 1 },
      predicate: (cellValue) => cellValue === 9,
    });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 1, c: 0 },
        { r: 0, c: 2 },
      ]),
    );
  });

  it('should return an empty array if no neighbors match the predicate', () => {
    const board = [
      [1, 1, 9],
      [9, 0, 1],
      [1, 1, 1],
    ];
    const result = findNeighbourCells({
      board,
      pos: { r: 1, c: 1 },
      predicate: (cellValue) => cellValue === 8,
    });

    expect(result).toEqual([]);
  });

  it('should handle edge cases correctly (e.g., corner cells)', () => {
    const board = [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
    ];

    const result = findNeighbourCells({
      board,
      pos: { r: 0, c: 0 },
    });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 0, c: 1 },
        { r: 1, c: 1 },
      ]),
    );
  });

  it('should handle empty or null positions gracefully', () => {
    const board = [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
    ];

    const result = findNeighbourCells({
      board,
      pos: { r: -1, c: -1 },
    });

    expect(result).toEqual([]);
  });
});

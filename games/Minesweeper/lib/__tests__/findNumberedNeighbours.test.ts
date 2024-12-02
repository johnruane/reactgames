import { findNumberedNeighbours } from '../findNumberedNeighbours';
import { vi } from 'vitest';

describe('findNumberedNeighbours', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find numbered neighbors correctly', () => {
    const board = [
      [0, 1, 2],
      [3, 0, 0],
      [0, 0, 0],
    ];
    const cellsToSearch = [{ r: 1, c: 1 }];

    const result = findNumberedNeighbours({
      board,
      cellsToSearch,
    });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 0, c: 1 },
        { r: 1, c: 0 },
        { r: 0, c: 2 },
      ]),
    );
  });

  it('should not add neighbors that are already in cellsToSearch', () => {
    const board = [
      [0, 1, 2],
      [3, 0, 0],
      [0, 0, 0],
    ];
    const cellsToSearch = [
      { r: 1, c: 1 },
      { r: 0, c: 1 },
    ];

    const result = findNumberedNeighbours({
      board,
      cellsToSearch,
    });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 1, c: 0 },
        { r: 0, c: 2 },
      ]),
    );
  });

  it('should not add duplicate neighbors', () => {
    const board = [
      [0, 1, 2],
      [3, 0, 0],
      [0, 0, 0],
    ];
    const cellsToSearch = [
      { r: 1, c: 1 },
      { r: 1, c: 2 },
    ];

    const result = findNumberedNeighbours({
      board,
      cellsToSearch,
    });

    expect([...result]).toEqual(
      expect.arrayContaining([
        { r: 0, c: 1 },
        { r: 0, c: 2 },
        { r: 1, c: 0 },
      ]),
    );
  });

  it('should return an empty array if there are no numbered neighbors', () => {
    const board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const cellsToSearch = [{ r: 1, c: 1 }];

    const result = findNumberedNeighbours({
      board,
      cellsToSearch,
    });

    expect(result).toEqual([]);
  });
});

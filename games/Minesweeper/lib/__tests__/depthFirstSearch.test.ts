import { depthFirstSearch } from '../depthFirstSearch';

describe('depthFirstSearch', () => {
  it('should return the initial position if the cell value is not 0', () => {
    const board = [
      [0, 1, 2],
      [0, 0, 4],
      [5, 0, 7],
    ];
    const pos = { r: 0, c: 1 };

    const result = depthFirstSearch({
      board,
      pos,
    });

    expect(result).toEqual([pos]);
  });

  it('should return all cells with value 0 and adjacent numbered cells', () => {
    const board = [
      [0, 1, 2, 8],
      [0, 0, 4, 6],
      [5, 0, 7, 3],
      [5, 0, 7, 3],
    ];
    const pos = { r: 1, c: 0 };

    const result = depthFirstSearch({
      board,
      pos,
    });
    expect([...result].length).toBe(12);
    expect([...result]).toEqual(
      expect.not.arrayContaining([
        { r: 0, c: 3 },
        { r: 1, c: 3 },
        { r: 2, c: 3 },
        { r: 3, c: 3 },
      ]),
    );
  });

  it('should return 0 cell and adjacent numbered cells', () => {
    const board = [
      [5, 1, 1, 2],
      [2, 6, 0, 4],
      [5, 7, 3, 7],
      [5, 7, 3, 7],
    ];
    const pos = { r: 1, c: 2 };

    const result = depthFirstSearch({
      board,
      pos,
    });
    expect([...result].length).toBe(9);
    expect(result).toEqual(
      expect.not.arrayContaining([
        { r: 0, c: 0 },
        { r: 1, c: 0 },
        { r: 2, c: 0 },
        { r: 3, c: 0 },
      ]),
    );
  });

  it('should visit diagonal 0 cells', () => {
    const board = [
      [1, 1, 0, 1],
      [2, 0, 4, 2],
      [0, 3, 7, 2],
    ];
    const pos = { r: 0, c: 2 };

    const result = depthFirstSearch({
      board,
      pos,
    });

    expect(result).toEqual(
      expect.arrayContaining([
        { r: 0, c: 1 },
        { r: 0, c: 2 },
        { r: 0, c: 3 },
        { r: 1, c: 0 },
        { r: 1, c: 1 },
        { r: 1, c: 2 },
        { r: 2, c: 0 },
        { r: 2, c: 1 },
      ]),
    );
  });
});

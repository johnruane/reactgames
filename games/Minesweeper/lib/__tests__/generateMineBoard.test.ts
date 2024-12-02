import { generateMineBoard } from '../generateMineBoard';

const getRandomEmptyBoardPositionMock = vi.hoisted(() => vi.fn());

vi.mock('../../../Snake/lib/utils/getRandomEmptyBoardPosition', () => {
  return {
    getRandomEmptyBoardPosition: getRandomEmptyBoardPositionMock,
  };
});

describe('generateMineBoard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should place the correct number of mines', () => {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const numberOfMines = 3;

    getRandomEmptyBoardPositionMock
      .mockReturnValueOnce({ row: 0, col: 0 })
      .mockReturnValueOnce({ row: 1, col: 1 })
      .mockReturnValueOnce({ row: 2, col: 2 });

    const mineBoard = generateMineBoard({ board, numberOfMines });

    expect(getRandomEmptyBoardPositionMock).toHaveBeenCalledTimes(3);
    expect(mineBoard).toEqual(
      expect.arrayContaining([
        [9, 0, 0],
        [0, 9, 0],
        [0, 0, 9],
      ]),
    );
  });

  it('should not place mines on already occupied positions', () => {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 2],
    ];
    const numberOfMines = 2;

    getRandomEmptyBoardPositionMock
      .mockReturnValueOnce({ row: 0, col: 0 })
      .mockReturnValueOnce({ row: 1, col: 1 });

    const mineBoard = generateMineBoard({ board, numberOfMines });

    expect(mineBoard).toEqual(
      expect.arrayContaining([
        [9, 0, 0],
        [0, 9, 0],
        [0, 0, 2],
      ]),
    );

    expect(getRandomEmptyBoardPositionMock).toHaveBeenCalledTimes(2);
  });

  it('should handle empty boards correctly', () => {
    const board = [
      [-1, -1],
      [-1, -1],
    ];
    const numberOfMines = 2;

    getRandomEmptyBoardPositionMock
      .mockReturnValueOnce({ row: 0, col: 0 })
      .mockReturnValueOnce({ row: 1, col: 1 });

    const mineBoard = generateMineBoard({ board, numberOfMines });

    expect(mineBoard).toEqual(
      expect.arrayContaining([
        [9, -1],
        [-1, 9],
      ]),
    );

    expect(getRandomEmptyBoardPositionMock).toHaveBeenCalledTimes(2);
  });

  it('should not modify the board when numberOfMines is 0', () => {
    const board = [
      [0, 0],
      [0, 0],
    ];
    const numberOfMines = 0;

    const mineBoard = generateMineBoard({ board, numberOfMines });

    expect(mineBoard).toEqual(
      expect.arrayContaining([
        [0, 0],
        [0, 0],
      ]),
    );

    expect(getRandomEmptyBoardPositionMock).not.toHaveBeenCalled();
  });
});

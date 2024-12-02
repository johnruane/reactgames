import { getRandomEmptyBoardPosition } from '../../Snake/lib/getRandomEmptyBoardPosition';

export const generateMineBoard = ({
  board,
  numberOfMines,
}: {
  board: number[][];
  numberOfMines: number;
}) => {
  const mineBoard = board;

  for (let i = 1; i <= numberOfMines; i += 1) {
    const { row, col } = getRandomEmptyBoardPosition({
      board: mineBoard,
      emptyCellValue: -1,
      delimiter: '|',
    });

    mineBoard[row][col] = 9;
  }

  return mineBoard;
};

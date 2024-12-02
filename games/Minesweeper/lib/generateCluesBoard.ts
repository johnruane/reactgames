/**
 * Takes @board and @emptyCellValue and for each cell in @board compares it's value to @emptyCellValue and if it
 * is a match proceeds to count the number of mines (9) that cell is touching.
 */
import _cloneDeep from 'lodash/cloneDeep';

export const generateCluesBoard = ({
  board,
  emptyCellValue,
}: {
  board: number[][];
  emptyCellValue: number;
}) => {
  const cloneBoard = _cloneDeep(board);
  cloneBoard?.forEach((boardRow, i) => {
    boardRow?.forEach((cell, j) => {
      if (cell !== emptyCellValue) return;

      let count = 0;
      const directions = [
        { r: i - 1, c: j }, // top
        { r: i, c: j - 1 }, // left
        { r: i + 1, c: j }, // bottom
        { r: i, c: j + 1 }, // right
        { r: i - 1, c: j - 1 }, // top left
        { r: i - 1, c: j + 1 }, // top right
        { r: i + 1, c: j + 1 }, // bottom right
        { r: i + 1, c: j - 1 }, // bottom left
      ];

      directions.forEach((dir) => {
        const { r, c } = dir || {};

        if (cloneBoard[r]?.[c] === 9) {
          count += 1;
        }
      });

      cloneBoard[i][j] = count;
    });
  });
  return cloneBoard;
};

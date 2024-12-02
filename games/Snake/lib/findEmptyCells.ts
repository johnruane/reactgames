/**
 * Loops through all the sub arrays of @board and returns an array containing strings
 * representing the array positions of elements that are zero.
 *
 * example: ['0-1', '1|1']
 *
 * @param {Number[][]} board
 * @param {string} delimeter
 * @return {String[]} Array of strings
 */

export function findEmptyCells({
  board,
  emptyCellValue = 0,
  delimiter = '-',
}: {
  board: number[][];
  emptyCellValue: number;
  delimiter: string;
}) {
  const emptyCellsArray: string[] = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === emptyCellValue) {
        emptyCellsArray.push(`${i}${delimiter}${j}`);
      }
    });
  });
  return emptyCellsArray;
}

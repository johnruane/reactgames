import { getCellValue } from './getCellValue';
import { cloneDeep } from 'lodash-es';
/**
 * Takes @displayBoard @gameplayBoard and @cellsToUpdate and for each position in either a single {r, c} } object or Array of
 * {r, c}} objects, will update the @displayBoard value to that of the @gameplayBoard value.
 *
 * This is how we update the game to reveal the cells clicked on. The reason @cellsToUpdate could be an array is so we can perform a
 * 'flood fill'.
 */

export const updateDisplayBoard = ({
  displayBoard,
  gameBoard,
  cellsToUpdate,
}: {
  displayBoard: number[][];
  gameBoard: number[][];
  cellsToUpdate: CellPosition[];
}) => {
  const newBoard = cloneDeep(displayBoard);

  cellsToUpdate.forEach((p) => {
    const { r, c } = p || {};
    const cellValue = getCellValue({ board: gameBoard, pos: p });

    if (cellValue !== null) {
      newBoard[r][c] = cellValue;
    }
  });

  return newBoard;
};

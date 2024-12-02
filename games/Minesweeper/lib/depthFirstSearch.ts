/**
 * Base on example: https://hackernoon.com/a-beginners-guide-to-bfs-and-dfs-in-javascript
 * Takes @board and @pos and does a Depth-first search returning an array of
 * {r: string, c: string} denoting all the adjacent cells next to each @pos that are value zero.
 */
import { findNeighbourCells } from './findNeighbourCells';
import { findNumberedNeighbours } from './findNumberedNeighbours';
import { getCellValue } from './getCellValue';

import { isObjectInSet } from '../../../shared/utils/isObjectInSet';

export const depthFirstSearch = ({
  board,
  pos,
}: {
  board: number[][];
  pos: CellPosition;
}): CellPosition[] => {
  const valueOfCell = getCellValue({ board, pos });

  if (valueOfCell !== 0) return [pos];

  const stack = [pos];
  const visited = new Set<CellPosition>();
  const result: CellPosition[] = [];

  /*
   * This loop performs a search of all adjacent cells and adds them to the 'stack' if they are 0. The result
   * is an array of all 0 cells that are connected.
   */
  while (stack.length) {
    const vertex: CellPosition | undefined = stack.pop();
    if (!vertex) return [];

    const valueOfCell = getCellValue({ board, pos: vertex });

    if (!isObjectInSet({ set: visited, obj: vertex }) && valueOfCell === 0) {
      visited.add(vertex);
      result.push(vertex);

      const neighbourCells = findNeighbourCells({ board, pos: vertex });
      neighbourCells.forEach((cell: CellPosition) => {
        stack.push(cell);
      });
    }
  }

  /*
   * This next loop looks at all the cells in 'result' and returns all numbered adjacent cells. This is so that the
   * 'flood-fill' feature reveals the numbered cells adjacent to the zero-based 'flood-fill' search.
   */
  const neighbouringCellsFound = findNumberedNeighbours({
    board: board,
    cellsToSearch: result,
  });

  return result.concat(neighbouringCellsFound);
};

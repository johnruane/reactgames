/**
 * Adds @snake to @board.
 * The @pos is the 'head' on the @snake. We loop through the @snake array and use the value of each element
 * as the direction to travel from the initial @pos A local copy of @pos is required to be updated after every
 * move in order to know where the next @snake piece should be placed from.
 */

const SNAKE_VALUE = 1;

export function addSnakeToBoard({
  board,
  snake,
  pos,
}: {
  board: number[][];
  snake: number[];
  pos: CellPosition;
}): number[][] {
  let localR = pos.r;
  let localC = pos.c;
  const localBoard = [...board];

  localBoard[localR][localC] = SNAKE_VALUE; // Add snake head first

  snake.forEach((item) => {
    switch (item) {
      case 1:
        localR = localR + 1; // Down
        break;
      case 2:
        localC = localC - 1; // Left
        break;
      case 3:
        localR = localR - 1; // Up
        break;
      case 4:
        localC = localC + 1; // Right
        break;
    }

    if (localBoard?.[localR]?.[localC] === undefined) return;

    localBoard[localR][localC] = SNAKE_VALUE; // Add snanke body
  });
  return localBoard;
}
